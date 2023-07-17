let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);
router.get('/userlist', usersController.userlist);

router.put('/edit/:id', usersController.updateuser);

router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;

router.get('/:id', usersController.getUserById); 

module.exports = router;

