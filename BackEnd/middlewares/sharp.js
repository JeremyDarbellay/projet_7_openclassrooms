const sharp = require('sharp');

module.exports = async ( req, res, next) => {

    // we always call this middleware on put and post route
    // but for put, sometimes there aren't any files
    if (req.file) {

        // we save image as webp
        const { buffer, originalname } = req.file;
        const name = originalname.split(' ').join('_');
        const imageName = name + Date.now() + '.webp';
        await sharp(buffer)
            .webp({ quality: 50 })
            .toFile("./public/images/"+ imageName);
    
        // saving imageUrl in request to use later
        req.imageUrl =  `${req.protocol}://${req.get("host")}/public/images/${imageName}`;

    }

    next();

}