const mongoose = require('mongoose');

const { dbUser, dbPass } = require('../config.json')

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.m9miyeb.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
