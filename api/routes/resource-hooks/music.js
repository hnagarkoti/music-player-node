/**
 * Created by hemant on 08-04-2017.
 */
let middleware = require('../../lib/middleware');

let out = {
    name: 'music',
    // preMiddleware: [middleware.authenticate],
    // contextFilter: function (model, req, done) {
    //                 const { query } = req._ermQueryOptions
    //                 if (req.user && req.user.userRole === 'admin') {
    //                   done(model.find({
    //                     company: {"$in": req.user.company}
    //                   }))
    //                 } else  {
    //                   done(model.find())
    //                 }
    //               }
    // onError: function(err, req, res, next) {
    //   middleware.errorHelper(err, next)
    // }
};

module.exports = out;
