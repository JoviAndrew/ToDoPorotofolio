const users = require('../model/user');
const ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
    registerUser: function(req, res){
        var regexUsername = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = req.body.password;
        let letter = /[a-zA-Z]/; 
        let number = /[0-9]/;
        let goodPassword = letter.test(password) && number.test(password);
        if(password.length < 6){
            res.json({
                message: 'Password too short!'
            })
        }else if(!goodPassword){
            res.json({
                message: 'Password must be alphanumeric'
            })
        }else if(!regexUsername.test(req.body.username)){
            res.json({
                message: 'Username must be email'
            })
        }else{
            users.findOne({
                username: req.body.username
            })
            .then(function(userData){
                if(userData != null){
                    res.status(400).json({
                        message: "username has been taken!",
                    })
                }else{
                    let salt = bcrypt.genSaltSync(saltRounds)
                    let hash = bcrypt.hashSync(password, salt);
                        users
                        .create({
                            username: req.body.username,
                            password: hash,
                        })
                        .then(function(result){
                            res.status(200).json({
                                message: "success register a new user",
                                result: result
                            })
                        })
                        .catch(function(err){
                            res.status(500).json({
                                message: err
                            })
                        }) 
                }
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            }) 
            
        }  
    },
    loginUser: function(req, res){
        users.findOne({
            username: req.body.username
        })
        .then(function(userData){
            if(userData.length == 0){
                res.json({
                    message: 'incorrect username or password'
                })
            }else{
                bcrypt.compare(req.body.password, userData.password, function(err, result){
                    if(!result){
                        res.json({
                            message: 'incorrect username or password'
                        })
                    }else{
                        let token = jwt.sign({username: userData._id}, process.env.SECRET)
                        res.json({
                            token: token
                        })
                    }
                })
            }
        })
    }
}