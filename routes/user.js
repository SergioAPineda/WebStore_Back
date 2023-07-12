let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);

module.exports = router;