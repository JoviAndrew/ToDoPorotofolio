require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153577.mlab.com:53577/todolist`);
const port = process.env.PORT || 4000;


const indexRouter = require('./routers/index'); 
const todoRouter = require('./routers/todo');
const userRouter = require('./routers/user')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/index', indexRouter)
app.use('/home', todoRouter)
app.use('/user', userRouter)

app.listen(3000, () =>{
    console.log('listening on port 3000')
})