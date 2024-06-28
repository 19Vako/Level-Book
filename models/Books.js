const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    namebook: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    Booklink: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
})

const Book = mongoose.model('Levels', BooksSchema)

module.exports = Book