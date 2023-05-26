const express = require("express");

const Purchase = require("../models/Setting");

const router = express.Router();

router.post("/", (req, res) => {
  const purchase = new Purchase({
    text: req.body.text,
    link: req.body.link
  });

  purchase.save()
  .then(result => {
      res.send({
          message: "Setting Saved Successfully",
          data: result
      })
  })
  .catch(err => console.log(err))
});

// /api/purchases
router.get('/', (req, res) => {
    Purchase.find().limit(1).sort({$natural:-1})
        .then(purchase => {
            res.send({
                message: "Setting Fetched.",
                data: purchase,
              });
        })
        .catch(err => console.log(err))
});

module.exports = router;