let mongoose = require('mongoose')

let questionModel = mongoose.Schema(
    {
	    questionText: {
            type: String,
            required: true
        },
	    created: {
            type: Date,
            default: Date.now
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        answer: String
    },
    {
        collection: "questions"
    } 
)

module.exports = mongoose.model("Question", questionModel);