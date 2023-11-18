
const mongoose = require('mongoose')

const mailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
    mailtype: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Mail", mailSchema)