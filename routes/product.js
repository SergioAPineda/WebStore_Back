let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');

router.post('/new', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.get('/', productController.getProductList);
router.get('/:id', productController.getProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;