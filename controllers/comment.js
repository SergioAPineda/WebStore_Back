let CommentModel = require('../models/comment');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Comment already exists';
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


module.exports.createComment = async function (req, res, next) {
    console.log("Create Comment");

    //let comment = new CommentModel(req.body);
    let comment = new CommentModel({
        _id: req.body.id,
        commentary: req.body.commentary,
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
                message: "Comment created successfully!"
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

module.exports.updateComment = async function (req, res, next) {

    try {

        let id = req.params.id

        let user = { ...req.body };

        let result = await CommentModel.updateOne({ _id: id }, user);

        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: 'true',
                message: "Comment Updated Successfully"
            })
        }
        else {
            throw new Error('Comment not updated. Please check the information and try again')
        }

    } catch (error) {
        next(error)
    }

};

module.exports.getCommentList = async function (req, res, next) {

    console.log("List Comments");

    let id = req.params.id

    try {
        let commentsList = await CommentModel.find({product: id}).sort({created: -1});

        return res.json(commentsList)


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