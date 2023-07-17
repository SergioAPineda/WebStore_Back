let User = require('../models/user');

module.exports.deleteUser = async function (req, res, next)  {
  try {
    let id = req.params.id;
    let result = await User.deleteOne({ _id: id });
  
    return res.json({ success: true, message: "User deleted" })

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.signup = async function (req, res, next) {

  console.log("sign up");

  let user = new User(req.body);
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

