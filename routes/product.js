let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');

router.post('/new', productController.createProduc);
router.put('/update/:id', productController.updateProduct);

module.exports = router;