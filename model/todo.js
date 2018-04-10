const mongoose = require('mongoose');
const Schema = mongoose.Schema

let todoSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    todo: String, 
}, {
    timestamps: true
})

let todo = mongoose.model('todo', todoSchema);

module.exports = todo;