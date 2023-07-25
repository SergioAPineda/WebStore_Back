let QuestionModel = require('../models/question');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Question already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};


module.exports.createQuestion = async function (req, res, next) {
    console.log("Create Question");

    //let comment = new CommentModel(req.body);
    let comment = new QuestionModel({
        _id: req.body.id,
        questionText: req.body.questionText,
        product: req.body.product,
        userName: req.body.userName
    });

    console.log(comment);

    try {

        let result = await comment.save();

        console.log(result);

        return res.json(
            {
                success: true,
                message: "Question created successfully!"
            }
        )

    } catch (error) {
        let message = getErrorMessage(error);

        return res.status(400).json(
            {
                success: false,
                message: message
            }
        )
    }
};

module.exports.updateQuestion = async function (req, res, next) {

    try {

        let id = req.params.id

        let question = { ...req.body };

        let result = await QuestionModel.updateOne({ _id: id }, question);

        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: 'true',
                message: "Question Updated Successfully"
            })
        }
        else {
            throw new Error('Question not updated. Please check the information and try again')
        }

    } catch (error) {
        next(error)
    }

};

module.exports.getQuestionList = async function (req, res, next) {

    console.log(`Question List of produt_ID: ${req.params.id}`);

    let id = req.params.id

    try {
        let questionList = await QuestionModel.find({product: id}).sort({created: -1});

        return res.json(questionList)


    } catch (error) {

        let message = getErrorMessage(error);

        return res.status(400).json(
            {
                success: false,
                message: message
            }
        )
    }
};

module.exports.getComment = async function (req, res, next) {
    console.log("getComment");
    try {
        let comment_id = req.params.id;

        console.log(comment_id)

        let comment = await CommentModel.findById(comment_id);

        return res.json(comment);
    } catch (error) {
        let message = getErrorMessage(error);

        return res.status(400).json(
            {
                success: false,
                message: message
            }
        )
    }
}

module.exports.deleteComment = async (req, res, next) => {
    try {

        let comment_id = req.params.id;

        let result = await CommentModel.deleteOne({ _id: comment_id });

        console.log(result)

        if (result.deletedCount > 0) {
            return res.json({ success: true, message: "Comment deleted" })
        } else {
            return res.json({ success: false, message: "Comment not found" })
        }

    } catch (error) {

        console.log(error);

        next(error)

    }

}