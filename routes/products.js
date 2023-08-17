let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');
let authController = require('../controllers/auth');

router.post('/new', authController.requireAuth, productController.createProduct);
router.put('/update/:id', authController.requireAuth, authController.isAllowed,productController.updateProduct);
router.get('/', productController.getProductList);
router.get('/user/:id', authController.requireAuth, productController.getProductListbyUser);
router.get('/:id', productController.getProduct);
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed, productController.deleteProduct);

module.exports = router;