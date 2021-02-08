const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../modules/User");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    //gelöscht muss erstetzt werden wenn mane s wieder zum laufen kriegen will
    user: "",
    pass: "",
  },
});

router.post("/kontakt", async (req, res) => {
  try {
    var mailOptions = {
      from: "larslemke1993@gmail.com",
      to: req.body.mail,
      subject: "Kontakt Physiomo",
      html:
        "Guten Tag, Sie haben uns kontaktiert: <br>" +
        req.body.message +
        "<br> Wir werden uns bei Ihnen zeitnahne melden!  <br>  <br>  Einen schönen Tag <br>  <br> Ihr Physiomo Team",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send(true);
  } catch (error) {
    res.send(false);
    res.json({ message: error });
  }
});

router.get("/sendall", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    for (var prop in users) {
      var mailOptions = {
        from: "larslemke1993@gmail.com",
        to: users[prop].email,
        subject: "Physiomo sagt Hallo",
        html: { path: "./assets/mails/index.htm" },
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.send(true);
  } catch (error) {
    res.send(false);
    res.json({ message: error });
  }
});

module.exports = router;
