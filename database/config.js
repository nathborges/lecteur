const mongoose = require('mongoose');


mongoose.connect(`mongodb://mongo:27017/lecteur`, {useNewUrlParser: true});

module.exports = mongoose;