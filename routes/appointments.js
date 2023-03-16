const express = require("express");
const sseExpress = require("sse-express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", (req, res) => {
  // Appointment.updateMany(
  //   { from: req.body.from, to: req.body.to },
  //   { acceptStatus: true, startStatus: true },
  //   { new: true }
  // )
  //   .then((result) => {
      // console.log("Appointment deleted successfullyd ", result);
      const dateIST = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      const appointment = new Appointment({
        from: req.body.from,
        to: req.body.to,
        fromName: req.body.fromName,
        time: dateIST,
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
    // })
    // .catch((err) => console.log(err));
});

// /api/appointments
router.get("/", (req, res) => {
  Appointment.find({ ...req.query })
    .then((appointments) => {
      res.send(appointments);
    })
    .catch((err) => console.log(err));
});
router.get("/admin", (req, res) => {
  Appointment.find({ ...req.query }).sort({ _id: -1 })
    .then((data) => {
      if (data) {
        const respose = {
          message: "Data Fetched successfully",
          count: data.length,
          data: data,
        };
        res.status(200).json(respose);
      } else {
        res.status(404).json({ message: "Users not found" });
      }
    })
    .catch((err) => console.log(err));
});
router.get("/admin/count", (req, res) => {
  Appointment.find({ ...req.query })
    .then((data) => {
      if (data) {
        const respose = {
          count: data.length,
        };
        res.status(200).json(respose);
      } else {
        res.status(404).json({ message: "Users not found" });
      }
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
    if (req.body?.acceptStatus == undefined)
      return res
        .status(400)
        .send({ success: false, message: "acceptStatus is required" });
    if (req.body?.startStatus == undefined)
      return res
        .status(400)
        .send({ success: false, message: "startStatus is required" });
    let updateData = {
      acceptStatus: req.body.acceptStatus,
      startStatus: req.body.startStatus,
    };
    if (req.body.isDeleted) {
      updateData = { ...updateData, isDeleted: req.body.isDeleted };
    }
    if (req.body.isCanceled) {
      updateData = { ...updateData, isCanceled: req.body.isCanceled };
    }
    const appo = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.send({ success: true, appo });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
});

// /api/appointments/requests/id
router.get("/requests/:id", (req, res) => {
  const docId = req.params.id;

  Appointment.find({ to: docId, isCanceled: false, isDeleted: false })
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
router.post('/delete/admin', (req,res,next)=>{
  const id = req.body.id;
  Appointment.remove({_id:id})
  .exec()
  .then(data => res.status(200).json({message: "Appointment deleted"}))
  .catch(err => res.status(500).json(err));
});
router.post(
  "/admin/update",
   (req, res, next) => {  
    Appointment.find({_id: req.body.uid })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(409).json({
            message: "User Not Exist",
          });
        } else {
          Appointment.update(
            { _id: req.body.uid},
            {
              comment: req.body.comment,
            }
          )
            .exec()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "Comment Added",
                user: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
            });
         });
        }
      });
  }
);

router.post("/admin/uid/", (req, res, next) => {
  const id = req.body.id;
  Appointment
    .find({ _id: req.body.id })
    .select()
    .exec()
    .then((data) => {
      // console.log("Data From Database"+data);
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ message: "Item Not Found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
