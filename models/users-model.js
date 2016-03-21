'use strict';

module.exports = (mongoose, models) => {
  let userSchema = mongoose.Schema({
    name: String, 
    files: [{type:mongoose.Schema.Types.ObjectId, ref: 'File'}],
    updated: {type: Date, default: Date.now}
  });
  let User = mongoose.model('User', userSchema);
  models.User = User;
};
