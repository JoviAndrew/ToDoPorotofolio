const mongoose = require('mongoose');
const Schema = mongoose.Schema

let todoSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    todo: String,
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true
})

let todo = mongoose.model('todo', todoSchema);

module.exports = todo;