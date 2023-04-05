const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../config.json');

/**
 * create an user with
 * hashed password
 */
exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( async (hashedPassword) => {

            let user = await User.findOne( { email: req.body.email } );

            if (user) return res.status(400).json({ message: "User already registered !"});

            user = new User({
                email: req.body.email,
                password: hashedPassword
            });

            user.save()
                .then( () => res.status(201).json({ message: "Successful registration !"}))
                .catch( (error) => res.status(400).json({ error }));
                
        })
        .catch( error => res.status(400).json({ error }));
}

/**
 * authenticate user against db
 * return userId and token
 */
exports.loginUser = ( req, res, next ) => {

    User.findOne( { email: req.body.email } )
        .then( user => {
            if (!user) {
                return res.status(401).json({ message: "Le couple d'identifiants utilisé est incorrecte"})
            } 
            bcrypt.compare(req.body.password, user.password)
                .then( (valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "Le couple d'identifiants utilisé est incorrecte"})
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            tokenSecretKey,
                            { expiresIn: '24h'}
                        )
                    })
                })
                .catch( error => res.status(500).json({ error }))
            
        })
        .catch( error => res.status(500).json({ error }))

}