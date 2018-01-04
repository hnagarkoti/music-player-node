let fs = require('fs');
let path = require('path');
const mongoose = require('mongoose');
let basename = path.basename(module.filename);
let db = {};

fs
.readdirSync(__dirname)
.filter(function(file) {
return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(function(file) {
let model = require(path.join(__dirname, file));
db[model.modelName] = model;
});

module.exports = db;
