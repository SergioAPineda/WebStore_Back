let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken');

let config = require("../config/config");

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

module.exports.deleteUser = async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await User.deleteOne({ _id: id });

    return res.json({ success: true, message: "User deleted" })

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.userlist = async function (req, res, next) {

  console.log("All users");
  try {
    let userlist = await User.find({});
    console.log(userlist);

    return res.json(userlist)


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

module.exports.updateuser = async function (req, res, next) {

  // ADD YOUR CODE HERE
  try {

    let id = req.params.id

    let updatedUser = { ...req.body };  // Builds updateduser from the values of the body of the request.

    // Submits updatedUser to the DB and waits for a result.
    let result = await User.updateOne({ _id: id }, updatedUser);

    console.log(result);

    // If the contact is updated redirects to the list
    if (result.modifiedCount > 0) {
      res.json({
        success: 'true',
        message: "User Updated Successfully"
      })
    }
    else {
      // Express will catch this on its own.
      throw new Error('User not updated. Are you sure they exists?')
    }

  } catch (error) {
    next(error)
  }

};

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

module.exports.getUserById = async function (req, res, next) {
  console.log("getUserById");
  try {
    let user_id = req.params.id;

    console.log(user_id)

    let user = await User.findById(user_id);

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



module.exports.signin = function (req, res, next) {
  passport.authenticate(
    'local',
    (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json(
            {
              success: false,
              message: err || info.message
            }
          )
        }

        req.login(user, { session: false }, (error) => {
          if (error) {
            return next(error);
          }

          const payload = { id: user._id, username: user.username };
          const token = jwt.sign(payload, config.SECRETKEY, {
            algorithm: 'HS512',
            expiresIn: '20min'
          });
          return res.json(
            {
              success: true,
              token: token
            }
          )
        })
      } catch (error) {
        console.log(error)
        return next(error);
      }
    }
  )(req, res, next);
}

module.exports.deleteUser = async (req, res, next) => {
  console.log("req: " + req.params)
  try {

    //let id = req.params.id;
    let user_id = req.params.id;

    let result = await User.deleteOne({ _id: user_id });

    //let result = await User.deleteById(id);

    console.log("result " + result.deleteCount)
    return res.json({ success: true, message: "User deleted" })
    // if (result.deleteCount > 0) {

    //   res.json({ success: true, message: "User deleted" })

    // }

  } catch (error) {

    //return res.status(400).json({success: false, message: getErrorMessage("Error")})

    console.log(error);

    next(error)

  }

}
