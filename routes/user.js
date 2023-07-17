let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let authController = require('../controllers/auth');

router.post('/signup', usersController.signup);

router.get('/userlist', usersController.userlist);

router.put('/edit/:id', authController.requireAuth, usersController.updateuser);

router.delete('/delete/:id', authController.requireAuth, usersController.deleteUser);

router.get('/:id', authController.requireAuth, usersController.getUserById); 

router.post('/signin', usersController.signin);

module.exports = router;

