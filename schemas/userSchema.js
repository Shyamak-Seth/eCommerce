const mongoose = require('mongoose'),
    reqString = {required: true, type: String}

const userSchema = new mongoose.Schema({
    email: reqString,
    fname: reqString,
    lname: reqString,
    password: reqString,
    cart: {
        type: Array,
        required: true,
        default: []
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("user", userSchema)