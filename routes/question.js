let express = require('express');
let router = express.Router();
let questionController = require('../controllers/question');
let authController = require('../controllers/auth');

router.post('/new', questionController.createQuestion);
router.put('/update/:id', authController.requireAuth, authController.isAllowedToAnswer, questionController.updateQuestion);
router.get('/product/:id', questionController.getQuestionList);
router.get('questions/:id', questionController.getQuestion);
router.get('questions/:id/answers', questionController.getQuestion);
router.delete('/:id', authController.requireAuth, authController.isAllowedToAnswer, questionController.deleteQuestion);

module.exports = router;