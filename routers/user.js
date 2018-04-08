const router = require('express').Router();
const user = require('../controllers/user_controller')

//route login
router.post('/login', user.loginUser);

//route register
router.post('/register', user.registerUser)


module.exports = router