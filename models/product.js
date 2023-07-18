let mongoose = require('mongoose')

let productModel = mongoose.Schema(
    {
        name: String,
        category: String,
        description: String,
        isactive: Boolean,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "products"
    } 
)

module.exports = mongoose.model("Product", productModel);