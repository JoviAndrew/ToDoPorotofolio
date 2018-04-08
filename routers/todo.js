const router = require('express').Router();
const todo = require('../controllers/todo_controller')

//add todo
router.post('/add', todo.addTodo);

//show todo
router.get('/show', todo.showTodo);

//update todo
router.put('/update', todo.updateTodo);

//delete todo
router.delete('/delete', todo.deleteTodo);

module.exports = router