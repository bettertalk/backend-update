const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  from: { type: mongoose.SchemaTypes.ObjectId, required: true },
  to: { type: mongoose.SchemaTypes.ObjectId, required: true },
  fromName: { type: String, required: true },
  time: { type: String, required: true },
  acceptStatus: { type: Boolean, default: false },
  startStatus: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isCanceled: { type: Boolean, default: false },
  appointmentType: { type: String, required: true },
  comment: { type: String },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
