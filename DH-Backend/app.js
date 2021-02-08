const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const EventEmitter = require("events");

const axios = require("axios");
// const paypal = require('paypal-rest-sdk')

const cors = require("cors");
const app = express();

require("dotenv/config");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const userRouts = require("./routs/user");
const videoRouts = require("./routs/videos");
const paymentRoute = require("./routs/payment");
const mailRoute = require("./routs/mails");
const kiRoute = require("./routs/ki");

app.use("/ki", kiRoute);
app.use("/mails", mailRoute);

app.use("/user", userRouts);
app.use("/videos", videoRouts);
app.use("/payment", paymentRoute);

app.get("/cancel", (req, res) => res.send("Cancelled"));

app.get("/api", (req, res) => {
  res.send("We are Home");
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

//start server
const { spawn } = require("child_process");

app.post("/getPlaylist", (req, res) => {
  console.log("createUbergabeCSV");

  //run phyton script und sende playlist ergebnis zurück
  console.log("spwan python");
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn("python", ["./python-ki/Prediction.py"]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
    res.end();
  });
});

app.listen(3000);
