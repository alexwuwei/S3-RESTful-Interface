let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
let models ={}

require('./files-model')(mongoose,models);
require('./users-model')(mongoose, models);

module.exports = models;
