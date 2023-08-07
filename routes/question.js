let express = require('express');
let router = express.Router();
let questionController = require('../controllers/question');
let authController = require('../controllers/auth');

router.post('/new', questionController.createQuestion);
router.put('/update/:id',questionController.updateQuestion);
router.get('/product/:id', questionController.getQuestionList);
router.get('/:id', questionController.getQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;