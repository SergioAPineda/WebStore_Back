let express = require('express');
let router = express.Router();
let questionController = require('../controllers/question');
let authController = require('../controllers/auth');

router.post('/new', questionController.createQuestion);
router.put('/update/:id', questionController.updateQuestion);
router.get('/product/:id', questionController.getQuestionList);
//router.get('/:id', commentController.getComment);
//router.delete('/:id', commentController.deleteComment);

module.exports = router;