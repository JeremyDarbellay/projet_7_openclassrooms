const mongoose = require('mongoose');

const dbUser = process.env.USER_NAME;
const dbPass = process.env.USER_PASS;
const dbUrl = process.env.DB_URL;

module.exports = mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
