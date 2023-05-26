const { URLSearchParams } = require("url");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
var crypto = require("crypto");
router.post("/", async (req, res, next) => {
  try {
    const encodedParams = new URLSearchParams();
    let hash1 =
      "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt";
    let hash2 = `FBVECCAUGO|bettertalk002|2.1|bettertalk|bettertalk|lakheraakshay@gmail.com|first payment||||||||||JQE72SQW2X`;

    const hash = crypto.createHash("sha512").update(hash2).digest("hex");
    encodedParams.set("key", "FBVECCAUGO");
    encodedParams.set("txnid", "bettertalk002");
    encodedParams.set("amount", "2.1");
    encodedParams.set("productinfo", "bettertalk");
    encodedParams.set("firstname", "bettertalk");
    encodedParams.set("phone", "7415206625");
    encodedParams.set("email", "lakheraakshay@gmail.com");
    encodedParams.set("surl", "https://www.google.com");
    encodedParams.set("furl", "https://www.google.com");
    encodedParams.set("hash", hash);
    encodedParams.set("udf1", "first payment ");
    encodedParams.set("state", "MP");
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
