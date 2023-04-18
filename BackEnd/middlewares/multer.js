const multer = require('multer');

// storage implementation
const storage = multer.memoryStorage();

module.exports = multer({storage: storage}).single('image');
