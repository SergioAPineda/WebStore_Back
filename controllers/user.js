let UserModel = require('../models/user');

function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
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

module.exports.signup = async function (req, res, next) {

  console.log("sign up");

  let user = new UserModel(req.body);
  console.log(user);

  try {

    let result = await user.save();

    console.log(result);
    return res.json(
      {
        success: true,
        message: "User created successfully!"
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

module.exports.getUserById = async function(req, res, next) {
  console.log("getUserById");
  try {
    let user_id = req.params.id;

    console.log(user_id)

    let user = await UserModel.findById(user_id);
  
    return res.json(user);
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