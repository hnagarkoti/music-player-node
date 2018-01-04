let express                             = require('express');
let restify                             = require('express-restify-mongoose');
let _                                   = require('lodash');
let middleware                          = require('../lib/middleware');
let Router                              = express.Router();
let models                              = require('../models');
let commonMiddlewareOptions             = require('./resource-hooks');
let musicMiddlewareOptions              = require('./resource-hooks/music');

let defaultOptions = {
  totalCountHeader: 'total',
  outputFn: ( req, res ) => {
    const data = req.erm;
    res.apiSuccess(data);
  },
  onError: (err, req, res, next) => {
    const statusCode = req.erm.statusCode;
    return middleware.errorHelper(err, res, next)
  }
}
module.exports = (app) => {
  restify.defaults(defaultOptions);

  // User Routes
  restify.serve(Router,  models.User, commonMiddlewareOptions);

  // Music Routes
  restify.serve(Router,  models.Music, musicMiddlewareOptions);


  app.use(Router);
}
