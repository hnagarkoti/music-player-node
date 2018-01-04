let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let config      = require('../config');
// var SALT_WORK_FACTOR = 10;

var User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  userRole: {
    type: String,
    enum: ['superadmin', 'admin', 'user'],
    default: 'user'
  },
  userType: {
    type: String,
    enum: ['admin', 'company', 'subscriber']
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date,
    default: undefined
  },
  location: [{lat:Number, lng:Number}]
},{
  timestamps: true
});

User.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', User);
