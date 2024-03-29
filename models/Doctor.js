const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
  name:  {type: String, required: true },
  profile:  {type: String, required: false },
  isAvailable:  {type: Boolean, default: false },
  qualification: {type: String, required: true },
  sessions:  {type: Number },
  calls:  {type: Number },
  minutes: {type: Number },
  loggedIn:  {type: String},
  rating:  {type: Array },
  availability: {type: Array, of: Array},
  about: {type: String},
  patients: {type: String},
  experience: {type: String},
  description: {type: String},
  age: {type: String},
  gender: {type: String},
  mobile: {type: String},
});

module.exports = mongoose.model('Doctor', DoctorSchema);