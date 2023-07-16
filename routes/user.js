let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');

router.post('/signup', usersController.signup);
router.get('/userlist', usersController.userlist);

router.put('/edit/:id', usersController.updateuser);

module.exports = router;