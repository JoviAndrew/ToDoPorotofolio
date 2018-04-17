const router = require('express').Router();
const user = require('../controllers/user_controller');

router.get('/show-user', user.getUser);

router.put('/update-user', user.updateUser);

module.exports = router;