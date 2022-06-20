const mongoose = require('../database/config');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    evaluate: {
        type: Number,
    },
    addedAt: {
        type: Date,
        require: true,
        default: Date.now,
    },
    finishedAt: {
        type: Date
    },
    status: {
        type: String,
        enum : ['TO READ','READING', 'READED'],
        default: 'TO READ',
        message: '{VALUE} is not supported',
    }}
);


const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
