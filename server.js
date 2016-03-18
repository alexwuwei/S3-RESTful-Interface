'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config/env');
let models = require('./models');


let mongoose = require('mongoose');
// let files = require('./models/files-model');
// let users = require('./models/users-model');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let middleRouter = express.Router();
require(__dirname + '/routes/route-handle')(middleRouter, models);

// app.use(bodyParser.json());
// app.use('/', middleRouter);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});

//ask about app listen in this file, and about penguin in penguin routes example https://github.com/codefellows/sea-401d2-javascript/tree/master/week-3/3-16-more-mongoose/inclass/mongoose-2
