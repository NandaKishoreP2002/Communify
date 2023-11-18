const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("GoogleUser", googleUserSchema)