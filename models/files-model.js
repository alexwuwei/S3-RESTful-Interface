'use strict';

module.exports = (mongoose, models) => {
  let fileSchema = mongoose.Schema({
    fileName: {type: String, required: true}, //revise
    content: String, //revise
    url: String,
    updated: {type: Date, default: Date.now}
  });
  let File = mongoose.model('File', fileSchema);
  models.File = File;
};
