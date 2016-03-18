'use strict';

module.exports = (mongoose, models) => {
  let fileSchema = mongoose.Schema({
    fileName: String, //revise
    content: String //revise
  });
  let File = mongoose.model('File', fileSchema);
  models.File = File;
};
