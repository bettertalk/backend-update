const express = require("express");
const mongoose = require("mongoose");
const doctors = require("./routes/doctors");
const appointments = require("./routes/appointments");
const users = require("./routes/users");
const razorpay = require("./routes/razorpay");
const purchases = require("./routes/purchases");
const forums = require("./routes/forums");
const notifications = require("./routes/notifications");
const Settings = require("./routes/Settings");
const Verify = require("./routes/verify");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Better Talk App Backend API");
});
app.use(cors());
app.use("/api/doctors", doctors);
app.use("/api/users", users);
app.use("/api/appointments", appointments);
app.use("/api/razorpay", razorpay);
app.use("/api/purchases", purchases);
app.use("/api/forums", forums);
app.use("/api/notifications", notifications);
app.use("/api/settings", Settings);
app.use("/api/verify", Verify);
require("dotenv").config();

const port = process.env.PORT || 5000;

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://bettertalkproject2:bettertalkproject2@cluster0.chjadsw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => console.log(`Server is running on ${port}`));
  })
  .catch((err) => console.log(err));
