let _ = require('lodash'),
defaultConfig = {
  "name": "musicmanager",
  "port": 8080,
  "emailer": {
    user: 'user@company.com',
    pass: 'xxxxxxxxx'
  }
},
env = process.env.NODE_ENV || 'development',
envConfig = {},
config;

try {
  envConfig = require('./env/' + env);
} catch (e) {
  console.log('Failed to require config file: ', 'env/' + env);
  envConfig = {};
}


config = _.defaults({}, envConfig, defaultConfig);
config.env = env;

module.exports = config;
