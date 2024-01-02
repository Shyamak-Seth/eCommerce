const mongoose = require('mongoose'),
    reqString = {required: true, type: String}

const itemSchema = new mongoose.Schema({
    item: reqString,
    url: reqString,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: reqString,
    unit: reqString
})

module.exports = mongoose.model("item", itemSchema)