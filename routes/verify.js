const express = require("express");
const User = require("../models/Verify");
require('dotenv').config();
const accountSid = 'AC504b2fd24e7b37a6770e4472e08aa814';
const authToken = process.env.MESSAGE;
const client = require('twilio')(accountSid, authToken);
const router = express.Router();

router.post("/sendotp", async (req, res) => {
  const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  try {
    const message = await client.messages.create({
      body: 'Hello from BetterTalk !!! Your Mental Health partner. Your Verification Code is '+randomNumber,
      from: '+14406933450',
      to: '+91'+req.body.mobile
    });
    console.log(message.sid);
  } catch (error) {
    console.error(error);
  }
  const user = new User({
    mobile: req.body.mobile,
    code: randomNumber,
  });
  user
    .save()
    .then((result) => {
      res.send({
        message: "Code is sent.",
      });
    })
    .catch((err) => console.log(err));
});

router.post("/otp/", (req, res) => {
  const mobile = req.body.mobile;
  const code = req.body.code;
  User.findOneAndUpdate(
    {mobile : mobile, code: code},
    {
      $set: { isVerify: true, code : null },
    },
    (err, result) => {
      if (result==null) {
        console.log("err: ", err);
        res.send({
          status: false,
          message: "Please Entry Correct OTP",
          // data: result,
        });
      } else {
        console.log("result: ", result);
        res.send({
          status : true,
          message: "User is verified.",
          data: result,
        });
      }
    }
  );
});


// /api/users

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

// // /api/users/id
// router.get("/:id", (req, res) => {
//   const userId = req.params.id;

//   User.findById(userId)
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => console.log(err));
// });

// // /api/users/name/id
// router.put("/name/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { name: req.body.name },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User name updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/age/id
// router.put("/age/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { age: req.body.age },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User age updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/qualification/id
// router.put("/qualification/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { qualification: req.body.qualification },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User qualification updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/gender/id
// router.put("/gender/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { gender: req.body.gender },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User gender updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/location/id
// router.put("/location/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { location: req.body.location },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User location updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/medHistory/id
// router.put("/medhistory/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { medHistory: req.body.medHistory },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User medhistory updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// // /api/users/freeSession/id
// router.put("/free/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { freeSession: req.body.freeSession },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User freeSession updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });


// // /api/users/sessions/id
// router.put("/sessions/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { sessions: req.body.sessions },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User sessions updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });


// // /api/users/minutes/id
// router.put("/minutes/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { minutes: req.body.minutes },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User minutes updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// router.post("/profile/:id", upload.single('Image'), async (req, res, next) => {
//   try {
//     var base64String = base64Encode(req.file.path);
//     const uploadString = "data:image/jpeg;base64," + base64String;
//     const uploadResponse = await cloudinary.uploader.upload(uploadString, {
//       overwrite: true,
//       invalidate: true,
//       crop: "fill",
//     });
//  var url =  uploadResponse.secure_url;
//  console.log(url);
//   } catch (e) {
//     console.log(e);
//   }
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { profile: url },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User Profile updated successfully",
//           data: result,
//         });
//       }
//     }
//   );
// });

// router.put("/available/:id", (req, res) => {
//   const userId = req.params.id;
//   User.findByIdAndUpdate(
//     userId,
//     {
//       $set: { isAvailable: req.body.status },
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err: ", err);
//       } else {
//         console.log("result: ", result);
//         res.send({
//           message: "User Availability Status updated successfully",
//           // data: result,
//         });
//       }
//     }
//   );
// });

// router.post("/admin/uid/", (req, res, next) => {
//   const id = req.body.id;
//   User
//     .find({ _id: req.body.id })
//     .select()
//     .exec()
//     .then((data) => {
//       // console.log("Data From Database"+data);
//       if (data) {
//         res.status(200).json({ data });
//       } else {
//         res.status(404).json({ message: "Item Not Found" });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error);
//     });
// });

// router.post(
//   "/admin/update",
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
// router.post('/delete/admin', (req,res,next)=>{
//   const id = req.body.id;
//   User.remove({_id:id})
//   .exec()
//   .then(data => res.status(200).json({message: "User deleted"}))
//   .catch(err => res.status(500).json(err));
// });
module.exports = router;
