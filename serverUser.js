const { MongoOIDCError } = require("mongodb");
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    library: {
        type: Array,
        default: [],
    }
});
const BookSchema = new mongoose.Schema({
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
        required: true
    },
    Booklink: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});
const AllBookSchema = new mongoose.Schema({
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
        required: true
    },
    Booklink: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


const User = mongoose.model("User", UserSchema, "users");
const AllBooks = mongoose.model("AllBooks", AllBookSchema, "allBooks")
const BooksA1 = mongoose.model("BooksA1", BookSchema, "A1_Level");
const BooksA2 = mongoose.model("BooksA2", BookSchema, "A2_Level");
const BooksB1 = mongoose.model("BooksB1", BookSchema, "B1_Level");
const BooksB2 = mongoose.model("BooksB2", BookSchema, "B2_Level");
const BooksC1 = mongoose.model("BooksC1", BookSchema, "C1_Level");
const BooksC2 = mongoose.model("BooksC2", BookSchema, "C2_Level");
module.exports = { BooksA1, BooksA2, BooksB1, BooksB2, BooksC1, BooksC2, User, AllBooks};


