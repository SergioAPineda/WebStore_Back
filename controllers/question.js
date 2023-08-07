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

    //let Question = new QuestionModel(req.body);
    let Question = new QuestionModel({
        _id: req.body.id,
        questionText: req.body.questionText,
        product: req.body.product,
        userName: req.body.userName,
        isAnswered: false
    });

    console.log(Question);

    try {

        let result = await Question.save();

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

        console.log("question id = "+ id)

        let updatedQuestion = { ...req.body };

        let result = await QuestionModel.updateOne({ _id: id }, updatedQuestion);

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

    console.log("List Questions");

    let id = req.params.id

    try {
        let QuestionsList = await QuestionModel.find({product: id}).sort({isAnswered: 1});

        return res.json(QuestionsList)


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

module.exports.getQuestion = async function (req, res, next) {
    console.log("getQuestion");
    try {
        let Question_id = req.params.id;

        console.log(Question_id)

        let Question = await QuestionModel.findById(Question_id);

        return res.json(Question);
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

module.exports.deleteQuestion = async (req, res, next) => {
    try {

        let Question_id = req.params.id;

        let result = await QuestionModel.deleteOne({ _id: Question_id });

        console.log(result)

        if (result.deletedCount > 0) {
            return res.json({ success: true, message: "Question deleted" })
        } else {
            return res.json({ success: false, message: "Question not found" })
        }

    } catch (error) {

        console.log(error);

        next(error)

    }

}