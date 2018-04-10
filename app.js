require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList');


const userRouter = require('./routers/user'); 
const todoRouter = require('./routers/todo')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter)
app.use('/home', todoRouter)

app.listen(3000, () =>{
    console.log('listening on port 3000')
})