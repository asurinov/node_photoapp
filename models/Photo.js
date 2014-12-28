/**
 * Created by Machete on 27.12.2014.
 */
var util = require('util');
var mongoose = require('mongoose');
var config = require('config');
var dbConfig = config.get('dbConfig');

mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s', dbConfig.username, dbConfig.password, dbConfig.host, dbConfig.port, dbConfig.dbName));

var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);