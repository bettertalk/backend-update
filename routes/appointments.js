const express = require("express");
const sseExpress = require("sse-express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", (req, res) => {
  Appointment.updateMany(
    { from: req.body.from, to: req.body.to },
    { acceptStatus: true, startStatus: true },
    { new: true }
  )
    .then((appointment) => {
      console.log("Appointment deleted successfully ", appointment);
    })
    .catch((err) => console.log(err));
  const appointment = new Appointment({
    from: req.body.from,
    to: req.body.to,
    fromName: req.body.fromName,
    time: req.body.time,
    acceptStatus: false,
    startStatus: false,
    appointmentType: req.body.appointmentType,
  });

  //delete any appointment that has same to and from?

  // return null;
  appointment
    .save()
    .then((result) => {
      res.send({
        message: "Appointment created successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

// /api/appointments
router.get("/", (req, res) => {
  Appointment.find({ ...req.query })
    .then((appointments) => {
      res.send(appointments);
    })
    .catch((err) => console.log(err));
});

// /api/appointments
router.delete("/", (req, res) => {
  Appointment.findOneAndDelete(
    { from: req.body.from, to: req.body.to },
    { new: true }
  )
    .then((appointment) => {
      res.send({
        message: "Appointment deleted successfully",
        data: appointment,
      });
    })
    .catch((err) => console.log(err));
});

// /api/appointments/upcoming/id
router.get("/upcoming/:id", (req, res) => {
  const userId = req.params.id;

  Appointment.find({ from: userId })
    .then((appointment) => {
      res.send(appointment);
    })
    .catch((err) => console.log(err));
});
// /api/appointments/upcoming/id
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const appo = await Appointment.findByIdAndUpdate(
      id,
      {
        acceptStatus: true,
        startStatus: true,
      },
      { new: true }
    );
    res.send(appo);
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
});

// /api/appointments/requests/id
router.get("/requests/:id", (req, res) => {
  const docId = req.params.id;

  Appointment.find({ to: docId })
    .then((appointment) => {
      if (appointment) {
        res.send(appointment);
      } else {
        console.log("No appointment for doctor Id ", docId, " found");
        res.send({
          message: "No appointment for doctor Id found",
          data: [],
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
