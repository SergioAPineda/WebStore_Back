let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');

router.post('/new', productController.createUser);

module.exports = router;