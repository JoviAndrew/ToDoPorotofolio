const todo = require('../model/todo');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    addTodo: function(req, res){
        todo
            .create({
                username: req.body.username,
                todo: req.body.todo,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then(function(result){
                res.status(200).json({
                    message: "success added new task",
                    result: result
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
    },
    deleteTodo: function(req, res){
        todo
            .bulkWrite([{
                deleteOne: {
                    filter: {'_id': ObjectID(req.params.id)}
                }
            }])
            .then(function(result){
                res.status(201).json({
                    message: "Success delete data!",
                    result: result
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
    },
    showTodo: function(req, res){
        todo
            .find()
            .exec()
            .then(function(todoData){
                res.status(200).json({
                    message: "success get all todo data",
                    list: todoData
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
    },
    updateTodo: function(req, res){
        todo
            .bulkWrite([{
                updateOne: {
                    filter: {'_id': ObjectID(req.params.id)},
                    update: {
                        todo: req.body.todo,
                        updatedAt: new Date()
                    }
                }
            }])
            .then(function(result){
                res.status(201).json({
                    message: "success update data",
                    result: result
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
    }
}