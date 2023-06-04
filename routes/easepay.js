const { URLSearchParams } = require("url");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const upload = require("../utils/multer");

var crypto = require("crypto");
const uuid = require("uuid");
router.post("/", upload.none(), async (req, res, next) => {
  try {
    // return null;
    const encodedParams = new URLSearchParams();
    const uniqueRandomID = uuid.v4();
    console.log(req.body, "<<body");
    let amount = req.body.amount;
    let name = req.body.name;
    let userId = req.body.userId;
    let mobile = req.body.mobile;
    let email = req.body.email ? req.body.email : "bettertalk@gmail.com";

    let session = req.body.session;
    let appType = "persession";

    let hash1 =
      "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt";
    let hash2 = `FBVECCAUGO|${uniqueRandomID}|${amount}|Session|${name}|${email}|${userId}||||||||||JQE72SQW2X`;

    const hash = crypto.createHash("sha512").update(hash2).digest("hex");
    encodedParams.set("key", "FBVECCAUGO");
    encodedParams.set("txnid", uniqueRandomID);
    encodedParams.set("amount", amount);
    encodedParams.set("productinfo", "Session");
    encodedParams.set("firstname", name);
    encodedParams.set("phone", mobile);
    encodedParams.set("email", email);
    // encodedParams.set("surl", "https://www.google.com");
    encodedParams.set(
      "surl",
      `https://backend-update-production.up.railway.app/api/users/sessions/${userId}/${session}`
    );
    encodedParams.set("furl", "https://www.google.com");
    encodedParams.set("hash", hash);
    encodedParams.set("udf1", userId);
    encodedParams.set("state", " ");
    const url = "https://pay.easebuzz.in/payment/initiateLink";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: encodedParams,
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
