const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;

const A1Schema = new mongoose.Schema({
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

const Books = mongoose.model("Books", A1Schema, "A1_Level")
module.exports = Books;