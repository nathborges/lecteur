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
    image: {
        type: String,
        require: true,
    },
    rate: {
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
    startedAt: {
        type: Date
    },
    status: {
        type: String,
        enum : ['TO READ','READING', 'READ'],
        default: 'TO READ',
        message: '{VALUE} is not supported',
    }
}
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
