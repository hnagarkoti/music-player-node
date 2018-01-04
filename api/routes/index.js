let express             = require('express');
let router              = express.Router();
let jwt                 = require('jsonwebtoken');
let config              = require('../config')
let models              = require('../models');
let middleware          = require('../lib/middleware');
let UserCtrl            = require('../controllers/UserCtrl')


router.get('/test', [middleware.authenticate, function(req, res){
  return res.apiSuccess(req.user,'');
}]);

router.post('/login', function(req, res){
  UserCtrl.authenticateUser(req, res);
})

router.post('/forgotPassword', function(req, res, next){
  UserCtrl.forgotPassword(req, res);
});

router.post('/reset/:token', function(req, res){
  UserCtrl.resetPassword(req, res);
});


router.get('/dummyUser', function(req, res){
  UserCtrl.addDummy(req, res);
})

router.post('/adduser', function(req, res){
  UserCtrl.addUser(req, res);
})


module.exports = router;
