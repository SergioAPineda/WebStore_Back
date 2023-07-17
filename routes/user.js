let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);

router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;

