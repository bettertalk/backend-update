const express = require("express");
const Forum = require("../models/Forum");

const router = express.Router();

router.post("/", (req, res) => {
  const forum = new Forum({
    name: req.body.name,
    content: req.body.content,
    likes: req.body.likes,
    date: req.body.date,
    comments: req.body.comments,
    userId: req.body.userId
  });

  forum
    .save()
    .then((result) => {
      res.send({
        message: "Forum created successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
});

// /api/Forum
router.get("/", (req, res) => {
  Forum.find()
    .then((forums) => {
      res.send(forums);
    })
    .catch((err) => console.log(err));
});

// add comments in posts
router.put("/comments/:id", (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  Forum.findByIdAndUpdate(
    postId,
    {
      $push: { "comments": {"name": req.body.name, "content": req.body.content} },
    },
    {new: true},
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "Post comments updated successfully",
          data: result,
        });
      }
    }
  );
});

// update likes in posts
router.put("/likes/:id", (req, res) => {
  const postId = req.params.id;
  Forum.findByIdAndUpdate(
    postId,
    {
      $inc: { likes: req.body.likes },
    },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
      } else {
        console.log("result: ", result);
        res.send({
          message: "Post likes updated successfully",
          data: result,
        });
      }
    }
  );
});
router.get("/admin", (req, res) => {
  Forum.find({ ...req.query }).sort({ _id: -1 })
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
router.post('/delete/admin', (req,res,next)=>{
  const id = req.body.id;
  Forum.remove({_id:id})
  .exec()
  .then(data => res.status(200).json({message: "Forums deleted"}))
  .catch(err => res.status(500).json(err));
});

module.exports = router;