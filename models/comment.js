let mongoose = require('mongoose')

let commentModel = mongoose.Schema(
    {
	    commentary: {
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
        }
    },
    {
        collection: "comments"
    } 
)

module.exports = mongoose.model("Comment", commentModel);