'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config/env');
let models = require('./models');


let mongoose = require('mongoose');

let middleRouter = express.Router();
require(__dirname + '/routes/route-handle')(middleRouter, models);

app.use(bodyParser.json());
app.use('/', middleRouter);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
