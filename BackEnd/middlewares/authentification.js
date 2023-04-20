const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
 
module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ error: { message: "Vous devez être connecté pour effectuer cette opération" } });
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, tokenSecretKey );
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error: { message: error.message } });
   }
};