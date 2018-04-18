const users = require('../model/user');
var bcrypt = require('bcrypt');
const FB = require('fb');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


module.exports = {
    registerUser: function(req, res){
        var regexUsername = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
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
                            firstname: firstname,
                            lastname: lastname,
                            username: req.body.username,
                            password: hash,
                        })
                        .then(function(result){
                            res.status(200).json({
                                message: "success register a new user",
                                result: result
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
            if(!userData){
                res.status(400).json({
                    message: 'incorrect username or password'
                })
            }else{
                bcrypt.compare(req.body.password, userData.password, function(err, result){
                    if(!result){
                        res.json({
                            message: 'incorrect username or password'
                        })
                    }else{
                        let token = jwt.sign({id: userData._id}, process.env.SECRET)
                        res.json({
                            message: 'Success login',
                            token: token,
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                            username: userData.username
                        })
                    }
                })
            }
        })
    },
    loginFB: function(req, res){
        FB.api('me', { fields: ['id', 'first_name', 'last_name', 'email'], access_token: req.headers.token }, function (result) {
            users.findOne({
                username: result.email
            })
            .then(function(userData) {
                if(userData == null){
                    let username = result.email;
                    let pass = String(Math.random()*999999);
                    let salt = bcrypt.genSaltSync(saltRounds);
                    let hash = bcrypt.hashSync(pass, salt);
                    
                    users.create({
                        username: username,
                        password: pass
                    })
                    .then(response =>{
                        let token = jwt.sign({id: response._id}, process.env.SECRET)
                        res.json({
                            message: 'Success login',
                            token: token
                        })
                    })
                    .catch(function(err){
                        res.json({
                            message: err
                        })
                    })
                }else{
                    let token = jwt.sign({id: userData._id}, process.env.SECRET)
                    res.json({
                        message: 'Success login',
                        token: token,
                        firstname: result.first_name,
                        lastname: result.last_name,
                        fb_login: 1,
                    })
                }
            })
            
            
        });
    }
}