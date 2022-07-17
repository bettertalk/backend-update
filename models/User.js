const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:  {type: String, required: true },
  qualification:  {type: String },
  age:  {type: Number },
  gender:  {type: String },
  location:  {type: String },
  medHistory:  {type: String },
  freeSession:  {type: Boolean },
  upcomingApp: [],
  minutes:  {type: String },
  sessions:  {type: String },
});

module.exports = mongoose.model('User', UserSchema);