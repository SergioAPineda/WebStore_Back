let passport = require('passport');
let UserModel = require('../models/user');

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