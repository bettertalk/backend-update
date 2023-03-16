const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
  text: {type: String},
  link: {type: String},
});

module.exports = mongoose.model('Setting', PurchaseSchema);