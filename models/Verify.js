const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  code:  {type: String },
  mobile:  {type: String, required: true },
  isVerify:  {type: Boolean, default: false },
});

module.exports = mongoose.model('Verify', UserSchema);