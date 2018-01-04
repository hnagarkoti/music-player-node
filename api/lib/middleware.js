let jwt               = require('jsonwebtoken');
let config            = require('../config')
let _                 = require('lodash')
let middleware = {};

middleware.authenticate = function(req, res, next){
  // check for test cases
    if(process.env.NODE_ENV !== 'test'){
      // check header or url parameters or post parameters for token

      var token = req.body.token || req.query.token || req.headers['jwt'] || req.headers['token'];
      // console.log('token:---- ', token);
      // console.log('test_-------------------- ',req.headers['token']);
      // decode token
      if(token){
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.user = decoded;
            return next();
          }
        });
      } else {
        // if there is no token return an error
        return res.apiError('No token provided.')
      }
    } else {
      return next();
    }
}

middleware.isSuperAdmin = (req, res, next) => {
  if(process.env.NODE_ENV !== 'test'){
    if (req.user && req.user.userRole === 'superadmin') {
        return next();
    }
    return res.apiError(new Error('Unauthorized access, contact an admin'));
  }
    return next();
};

middleware.isAutherised = (req, res, next) => {
  // if(process.env.NODE_ENV !== 'test'){
  //   if(req.user && (req.user.userRole === 'superadmin' || req.user.userRole ==='admin' )){
  //     return next();
  //   } else {
  //     return res.apiError(new Error('Unauthorised access, please contact to admin'));
  //   }
  // }
  return next();
}

middleware.errorHelper = function(err, res, cb) {
  //If it isn't a mongoose-validation error, just throw it.
  if (err.name !== 'ValidationError') return cb(err);
  var messages = {
  'required': "%s is required.",
  'min': "%s below minimum.",
  'max': "%s above maximum.",
  'enum': "%s not an allowed value."
  };

  //A validationerror can contain more than one error.
  var errors = [];
  //Loop over the errors object of the Validation Error
  Object.keys(err.errors).forEach(function (field) {
  var eObj = err.errors[field];
  //If we don't have a message for `type`, just push the error through
  if (!messages.hasOwnProperty(eObj.kind)) errors.push(eObj.kind);

  //Otherwise, use util.format to format the message, and passing the path
  else errors.push(require('util').format(messages[eObj.kind], _.startCase(eObj.path)));
  // console.log('errrors:---- ',errors);
  });
  return res.apiError({easy:errors, src: err.errors})
};

module.exports = middleware;
