'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config/env');

let mongoose = require('mongoose');
let files = require('./models/files-model');
let users = require('./models/users-model');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let middleRouter = express.Router();
require(__dirname + '/routes/route-handle')(middleRouter);

app.use(bodyParser.json());
app.use('/', middleRouter);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
