let passport = require('passport');
let UserModel = require('../models/user');
let ProductModel = require('../models/product');
let QuestionModel = require('../models/question');

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return 'Unknown server error';
  }
};

exports.requireAuth = function (req, res, next) {

  passport.authenticate(
    'tokencheck',
    { session: false },
    function (err, payload, info) {
      if (err) return res.status(401).json(
        {
          success: false,
          message: getErrorMessage(err)
        }
      );
      if (info) return res.status(401).json({
        success: false,
        message: info.message
      });

      req.payload = payload;
      next();
    })(req, res, next);
}

exports.isAllowed = async function (req, res, next) {

  try {
    let id = req.params.id
    
    let productModelItem = await ProductModel.findById(id).populate('owner');

    // If there is no item found.
    if (productModelItem == null) {
      throw new Error('Product not found.') // Express will catch this on its own.
    }
    else if (productModelItem.owner != null) { // If the item found has a owner.

      console.log("productModelItem.owner._id " + productModelItem.owner._id);
      console.log("req.payload.id " + req.payload.id);

      if (productModelItem.owner._id != req.payload.id) { // If the owner differs.

        let currentUser = await UserModel.findOne({ _id: req.payload.id }, 'admin');

        if (currentUser.admin != true) { // If the user is not a Admin

          console.log('====> Not authorized');
          return res.status(403).json(
            {
              success: false,
              message: 'User is not authorized to modify this item.'
            }
          );
        }
      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      {
        success: false,
        message: getErrorMessage(error)
      }
    );
  }

}


exports.isAllowedToAnswer = async function (req, res, next) {

  try {
    let questionId = req.params.id
    
    let questionModelItem = await QuestionModel.findById(questionId).populate('product');

    let productModelItem = questionModelItem.product

    productModelItem.populate('owner');
    console.log(productModelItem.owner)


    // If there is no item found.
    if (productModelItem == null) {
      throw new Error('Product not found.') // Express will catch this on its own.
    }
    
    if (productModelItem.owner != null) { // If the item found has a owner.

      console.log("validating owner");
      console.log("productModelItem.owner._id " + productModelItem.owner._id);
      console.log("req.payload.id " + req.payload.id);

      if (productModelItem.owner._id != req.payload.id) { // If the owner differs.

        console.log('====> Not authorized');
          return res.status(403).json(
            {
              success: false,
              message: 'User is not authorized to modify this item.'
            }
          );

      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      {
        success: false,
        message: getErrorMessage(error)
      }
    );
  }

}