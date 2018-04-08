const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true
})

let user = mongoose.model('user', userSchema);

module.exports = user;