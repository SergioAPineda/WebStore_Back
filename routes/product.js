let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');
let authController = require('../controllers/auth');

router.post('/new', authController.requireAuth, productController.createProduct);
router.put('/update/:id', authController.requireAuth, authController.isAllowed,productController.updateProduct);
router.get('/', productController.getProductList);
router.get('/:id', productController.getProduct);
router.delete('/:id', authController.requireAuth, authController.isAllowed, productController.deleteProduct);

module.exports = router;