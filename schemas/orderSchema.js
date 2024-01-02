const mongoose = require('mongoose'),
    reqString = {required: true, type: String}

const orderSchema = new mongoose.Schema({
    email: reqString,
    items: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("order", orderSchema)