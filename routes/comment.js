let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comment');
let authController = require('../controllers/auth');

router.post('/new', authController.requireAuth, commentController.createComment);
router.put('/update/:id', authController.requireAuth, authController.isAllowed, commentController.updateComment);
router.get('/', commentController.getCommentList);
router.get('/:id', commentController.getComment);
router.delete('/:id', authController.requireAuth, authController.isAllowed, commentController.deleteComment);

module.exports = router;