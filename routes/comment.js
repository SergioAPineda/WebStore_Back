let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comment');
let authController = require('../controllers/auth');

router.post('/new', commentController.createComment);
router.put('/update/:id', authController.isAllowed, commentController.updateComment);
router.get('/product/:id', commentController.getCommentList);
router.get('/:id', commentController.getComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;