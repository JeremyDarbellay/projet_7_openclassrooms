const fs = require('fs');
const Book = require('../models/books')

// @TODO documentation

exports.getOneBook = (req, res, next) => {
    Book.findById(req.params.id)
        .then( book => res.status(200).json( book ))
        .catch( error => res.status(404).json({ error }))
}

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }))
}


exports.getBestRatedBooks = (req, res, next) => { 
    
    Book.find().sort({ averageRating: 'desc' })
        .then( (descList) => {
            const results = descList.slice(0, 2);
            res.status(200).json( results );
        })
        .catch( error => res.status(500).json({ error }) );

}

/**
 * authentified routes
 */

exports.modifyOneBook = async (req, res, next) => {

    let bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
    } : {
        ...req.body
    };

    // check that user is author of this entity.
    const oldBook = await Book.findById(req.params.id)
        .catch( error => res.status(404).json( { error } ) );

    if (oldBook.userId !== req.auth.userId )  return res.status(403).json({ message: "Unauthorized"})   
    

    Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id }, { new: true, runValidators: true })
        .then( (updatedBook) => {

            // remove old image
            if (req.file) {
                const oldImg = oldBook.imageUrl.split('/public/images/')[1]
                fs.unlink(`public/images/${oldImg}`, (err) => {
                    if (err) throw err;
                });
            }

            res.status(201).json({ updatedBook })
        })
        .catch((error) => {
            // remove uploaded file if book update rejected
            const filename = bookObject.imageUrl.split('/public/images')[1]
            if (req.file) fs.unlink(`public/images/${filename}`, () => {
                res.status(400).json({ error })
            });
        });
       
}

exports.deleteOneBook = (req, res, next) => {

    Book.findById(req.params.id)
        .then( (book) => {

            if (book.userId != req.auth.userId) return res.status(403).json({ message: "Unauthorized" })

            const filename = book.imageUrl.split('/public/images')[1]
            fs.unlink(`public/images/${filename}`, () => {

                Book.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({ message: "removed!"}) })
                    .catch( error => res.status(400).json({ error }));

            })
            
        })
        .catch(error => res.status(404).json({ error }))
}

exports.createOneBook = (req, res, next) => {

    let bookObject = JSON.parse(req.body.book);

    /**
     * remove untrusted fields
     */
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
    })

    if (book.ratings) book.averageRating = calculateAverageRating(book);

    book.save()
        .then( () => res.status(201).json( { book }))
        .catch( (error) => {
            // remove file because book rejected
            fs.unlink(`public/images/${req.file.filename}`, (err) => { 
                if (err) console.error(err);
            });
            res.status(400).json({ error });
        })

}

exports.RateOneBook = async (req, res, next) => {

    let book = await Book.findById(req.params.id)
        .catch( (error) => {
            return res.status(400).json({ error });
        });
    const userId = req.auth.userId;

    /** @type {Array} */
    const ratingArray = book.ratings

    if ( ratingArray.filter(( ratedByUser => userId == book.userId )).length > 0 ) return res.status(403).json({ message: "Already rated" });

    // just checking that rate is a number before updating average rate
    // because validation occurs on save
    if ( typeof (req.body.rating) !== "number" ) return res.status(400).json({ message: "rating is NaN" });

    book.ratings.push({ userId: userId, grade: req.body.rating });
    
    book.averageRating = calculateAverageRating(book);

    book.save()
        .then( (updatedBook) => res.status(201).json(updatedBook))
        .catch( error => res.status(400).json({ error }));

    
}

/**
 * @param {Object} book 
 * @returns {Number}
 */
function calculateAverageRating(book) {
    
    const rates = book.ratings, rateCount = book.ratings.length;
    let total = 0;

    rates.forEach( (rate) => {
        if (rate.grade) total += rate.grade;
    }) 

    let average = total / rateCount;

    return average

}