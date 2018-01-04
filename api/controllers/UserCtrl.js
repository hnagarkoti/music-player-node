let config          = require('../config');
let jwt             = require('jsonwebtoken');
let models          = require('../models');
let async           = require('async');
let crypto          = require('crypto');
let Mailer          = require('../lib/Mailer');
let bcrypt          = require('bcrypt');


function authenticateUser(req, res){
  models.User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) res.apiError(err);

    if (!user) {
      return res.apiError(new Error('Authentication failed user not found.'));
    } else if (user) {

      user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) res.apiError(err);
            if(isMatch){
              var usr = {
                userRole: user.userRole,
                userType: user.userType,
                company: user.company,
                name: user.name,
                _id: user._id
              }
              var token = jwt.sign(usr, config.secret, {
                expiresIn: 60*60*24 // expires in 24 hours
              });
              return res.apiSuccess({
                token,
                user: usr
              }, 'Enjoy your token!')
            } else {
              return res.apiError(new Error('Authentication failed. Password doesnt matched.'));
            }
      });
    }
  });
}

function addDummy(req, res){
  models.User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.apiError(new Error('User already exists!'));
    }
    var user = new models.User({
    "name": "Hemant Singh",
    "email": "hemant_nagarkoti@yahoo.com",
    "password": "hemant1",
    "phone": "9811564873",
    "userRole": "superadmin",
    "location": {lat: 43.32323, lng: 23.23}
});
    user.save(function(err) {
      if(err) return res.apiError(new Error(err));
      return res.apiSuccess('Done')
    });
  });
}

function addUser(req, res){
  models.User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.apiError(new Error('User already exists!'));
    }
    var user = new models.User({
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "phone": req.body.password || '1234567891',
    "userRole": 'user'
});
    user.save(function(err) {
      if(err) return res.apiError(new Error(err));
      return res.apiSuccess('Done')
    });
  });
}

function forgotPassword(req, res){
  if(!req.body.email) return res.apiError(new Error('email address required!'));
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      models.User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res.apiError(new Error('No user found with this email address not found!'));
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour 3600000
        user.save(function(err) {
          if(err) res.apiError(new Error('Error while reseting token!'));
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      // send mail to user
      var link = 'http://localhost:8080/reset/' + token;
      var html_text = '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the below button, to complete the process:\n\n' +
      '<table><tr>  <td style="background-color: #4ecdc4;border-color: #4c5764;border: 2px solid #45b7af;padding: 10px;text-align: center;"><a target="_blank" style="display: block;color: #ffffff;font-size: 12px;text-decoration: none;text-transform: uppercase;" href='+link+'>  Reset Password  </a>  </td></tr></table></p>'+
      'If you did not request this, please ignore this email and your password will remain unchanged.\n';
      var subject = 'Viscous Reset Password Link';
      var out = Mailer.mailingService(user, subject, html_text);
      out.then(function(output){
        return res.apiSuccess(output, "An email is sent to "+output.email+" with password reset information.")
      })
      .catch(function(err){
        return res.apiError(new Error('Technical problem ocurred while sending mail.'));
      })
    }
  ], function(err) {
    if (err) return next(err);
      return res.apiError(new Error('Technical problem ocurred while sending mail.'));
  });
}

function resetPassword(req, res){
  models.User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.apiError(new Error('Password reset token is invalid or has expired.'));
    } else {
      if(req.body.confirmPassword !== req.body.password){
        return res.apiError(new Error('New Password and Confirm Password fields doesn\'t matched.'));
      } else {
        encryptPassword(req, res)
        .then(function(passwordHash){
          models.User.findByIdAndUpdate(user._id,
            { $set: {password: passwordHash, resetPasswordToken: undefined, resetPasswordExpires: undefined }},
            { new: true },
            function(err, data){
            if(err) return res.send({code: 100, error: err});
            var subject = "Password reset successfully for Viscous Cube"
            var html_text = "<div><h3>Your request for password reset </h3><p>Hi "+data.name+",  You have requested for password reset is successfully done.</p></div>"
            Mailer.mailingService(data, subject, html_text);
            return res.apiSuccess(data, 'Password updated successfully!');
          })
        })
        .catch(function(err){
          return res.apiError(err, "Problem while hasing password.")
        })

      }
    }
  });
}


function encryptPassword(req, res){
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
        if (err) return reject(err);

        // hash the password using our new salt
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return reject(err);

            // override the cleartext password with the hashed one
            // return req.body.password = hash;
            return resolve(hash)
            // next();
        });
    });
  })

}
module.exports = {
  authenticateUser,
  forgotPassword,
  resetPassword,
  addDummy,
  addUser
}
