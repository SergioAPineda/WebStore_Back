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

    //let product = new ProductModel(req.body);
    let product = new ProductModel({
        _id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        isactive: req.body.isactive,
        owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner
    });

    try {

        let result = await product.save();

        console.log("req.payload.id " + req.payload.id);

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

module.exports.getProductList = async function (req, res, next) {

    console.log("List products");
    try {
        let productsList = await ProductModel.find().sort({name: 'asc'});

        console.log(productsList);

        return res.json(productsList)


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

module.exports.getProductListbyUser = async function (req, res, next) {

    console.log("List products for user");

    let user_id = req.params.id;

    try {
        let productsList = await ProductModel.find({owner: user_id}).sort({name: 'asc'});

        console.log(productsList);

        return res.json(productsList)


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

module.exports.getProduct = async function (req, res, next) {
    console.log("getProduct");
    try {
      let product_id = req.params.id;
  
      console.log(product_id)
  
      let product = await ProductModel.findById(product_id);
  
      return res.json(product);
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

  module.exports.deleteProduct = async (req, res, next) => {
    try {
  
      let product_id = req.params.id;
  
      let result = await ProductModel.deleteOne({ _id: product_id });

      console.log(result)
      if(result.deletedCount > 0){
        return res.json({ success: true, message: "Product deleted" })
      }else{
        return res.json({ success: false, message: "Product not found" })
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }



