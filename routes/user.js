let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);

router.get('/userlist', usersController.userlist);

router.put('/edit/:id', usersController.updateuser);

router.delete('/delete/:id', usersController.deleteUser);

router.get('/:id', usersController.getUserById); 

router.post('/signin', usersController.signin);

router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;

