const express = require("express");

const User = require("../models/User");
const Purchase = require("../models/Purchase");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const fs = require("fs");

function base64Encode(file) {
  var body = fs.readFileSync(file);
  return body.toString("base64");
}

const router = express.Router();

router.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
    qualification: req.body.qualification,
    age: req.body.age,
    gender: req.body.gender,
    location: req.body.location,
    medHistory: req.body.medHistory,
    freeSession: req.body.freeSession,
    upcomingApp: req.body.upcomingApp,
    minutes: req.body.minutes,
    sessions: req.body.sessions,
    mobile: req.body.mobile,
  });

  user
    .save()
    .then((result) => {
      res.send({
        message: "User data created successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

// /api/users
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
});
router.get("/admin", (req, res) => {
  User.find()
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

// /api/users/id
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
});

// /api/users/name/id
router.put("/name/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { name: req.body.name },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User name updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/age/id
router.put("/age/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { age: req.body.age },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User age updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/qualification/id
router.put("/qualification/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { qualification: req.body.qualification },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User qualification updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/gender/id
router.put("/gender/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { gender: req.body.gender },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User gender updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/location/id
router.put("/location/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { location: req.body.location },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User location updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/medHistory/id
router.put("/medhistory/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { medHistory: req.body.medHistory },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User medhistory updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/freeSession/id
router.put("/free/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { freeSession: req.body.freeSession },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User freeSession updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/sessions/id
router.get("/sessions/:id/:sessions", (req, res) => {
  const userId = req.params.id;
  const sessions = req.params.sessions;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { sessions },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User sessions updated successfully",
          data: result,
        });
      }
    }
  );
});

// /api/users/minutes/id
router.put("/minutes/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { minutes: req.body.minutes },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User minutes updated successfully",
          data: result,
        });
      }
    }
  );
});

router.post("/profile/:id", upload.single("Image"), async (req, res, next) => {
  try {
    var base64String = base64Encode(req.file.path);
    const uploadString = "data:image/jpeg;base64," + base64String;
    const uploadResponse = await cloudinary.uploader.upload(uploadString, {
      overwrite: true,
      invalidate: true,
      crop: "fill",
    });
    var url = uploadResponse.secure_url;
    console.log(url);
  } catch (e) {
    console.log(e);
  }
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { profile: url },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User Profile updated successfully",
          data: result,
        });
      }
    }
  );
});

router.put("/available/:id", (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(
    userId,
    {
      $set: { isAvailable: req.body.status },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "User Availability Status updated successfully",
          // data: result,
        });
      }
    }
  );
});

router.post("/admin/uid/", (req, res, next) => {
  const id = req.body.id;
  User.find({ _id: req.body.id })
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

router.post("/admin/update", upload.single("Image"), async (req, res, next) => {
  try {
    var base64String = base64Encode(req.file.path);
    const uploadString = "data:image/jpeg;base64," + base64String;
    const uploadResponse = await cloudinary.uploader.upload(uploadString, {
      overwrite: true,
      invalidate: true,
      crop: "fill",
    });
    var url = uploadResponse.secure_url;
    console.log(url);
  } catch (e) {
    console.log(e);
  }
  User.find({ _id: req.body.uid })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({
          message: "User Not Exist",
        });
      } else {
        User.update(
          { _id: req.body.uid },
          {
            name: req.body.name,
            mobile: req.body.mobile,
            qualification: req.body.qualification,
            profile: url,
            age: req.body.age,
            gender: req.body.gender,
            location: req.body.location,
            sessions: req.body.sessions,
          }
        )
          .exec()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "User Updated",
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
});

// router.post(
//   "/admin/update/image",
//   upload.single('Image'),
//   async (req, res, next) => {
//     try {
//       var base64String = base64Encode(req.file.path);
//       const uploadString = "data:image/jpeg;base64," + base64String;
//       const uploadResponse = await cloudinary.uploader.upload(uploadString, {
//         overwrite: true,
//         invalidate: true,
//         crop: "fill",
//       });
//    var url =  uploadResponse.secure_url;
//    console.log(url);
//     } catch (e) {
//       console.log(e);
//     }
//     User.find({_id: req.body.uid })
//       .exec()
//       .then((user) => {
//         if (user.length < 1) {
//           return res.status(409).json({
//             message: "User Not Exist",
//           });
//         } else {
//           User.update(
//             { _id: req.body.uid},
//             {
//               name: req.body.name,
//               mobile: req.body.mobile,
//               qualification: req.body.qualification,
//               profile: url,
//               age: req.body.age,
//               gender: req.body.gender,
//               location: req.body.location,
//               sessions: req.body.sessions,
//             }
//           )
//             .exec()
//             .then((result) => {
//               console.log(result);
//               res.status(201).json({
//                 message: "User Updated",
//                 user: result,
//               });
//             })
//             .catch((err) => {
//               console.log(err);
//               res.status(500).json({
//                 error: err,
//               });
//             });
//         }
//       });
//   }
// );
router.post("/delete/admin", (req, res, next) => {
  const id = req.body.id;
  User.remove({ _id: id })
    .exec()
    .then((data) => res.status(200).json({ message: "User deleted" }))
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
