let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);

router.get('/:id', usersController.getUserById); 

module.exports = router;