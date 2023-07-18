let ProductModel = require('../models/product');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Product already exists';
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

module.exports.createProduct = async function (req, res, next) {

    console.log("Create User");

    let product = new ProductModel(req.body);

    try {

        let result = await product.save();

        console.log(result);
        return res.json(
            {
                success: true,
                message: "Product created successfully!"
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

module.exports.updateProduct = async function (req, res, next) {

    try {
  
      let id = req.params.id
  
      let user = { ...req.body };
  
      let result = await ProductModel.updateOne({ _id: id }, user);
  
      console.log(result);
  
      if (result.modifiedCount > 0) {
        res.json({
          success: 'true',
          message: "Product Updated Successfully"
        })
      }
      else {
        throw new Error('Product not updated. Please check the information and try again')
      }
  
    } catch (error) {
      next(error)
    }
  
  };