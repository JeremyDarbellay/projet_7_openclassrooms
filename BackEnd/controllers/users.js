const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

/**
 * create an user with
 * hashed password
 */
exports.createUser = (req, res, next) => {
    // deny registration if no password
    if (req.body.password !== '' || !req.body.password) return res.status(400).json({ error: { message: "Un mot de passe est requis" } });

    // hashing password with 10 round of salting
    bcrypt.hash(req.body.password, 10)
        .then( async (hashedPassword) => {

            user = new User({
                email: req.body.email,
                password: hashedPassword
            });

            user.save()
                .then( () => res.status(201).json({ message: "Utilisateur enregistré"}))
                .catch( (error) => res.status(400).json({ error: { message: error.message } }));
                
        })
        .catch( error => res.status(400).json({ error: { message: error.message } }));
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
                .catch( error => res.status(500).json({ error: { message: error.message } }))
            
        })
        .catch( error => res.status(500).json({ error: { message: error.message } }))

}