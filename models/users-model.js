'use strict';

module.exports = (mongoose, models) => {
  let userSchema = mongoose.Schema({
    name: String, //revise
    hat: String
  });
  let User = mongoose.model('User', userSchema);
  models.User = User;
};
