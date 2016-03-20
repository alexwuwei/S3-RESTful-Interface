'use strict';

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');

// let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);

let models = {};

require('./files-model')(mongoose, models);
require('./users-model')(mongoose, models);

module.exports = models;
