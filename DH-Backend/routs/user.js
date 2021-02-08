const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const Account = require("../modules/Account");
const Beruf = require("../modules/Beruf");
const Gesundheit = require("../modules/Gesundheit");
const Payment = require("../modules/Payment");
const bcrypt = require("bcrypt");

router.post("/getAccount", async (req, res) => {
  try {
    const account = await Account.findOne({ email: req.body.email });
    res.json(account);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/editHistory", async (req, res) => {
  try {
    console.log(req.body);
    const account = await Account.findOneAndUpdate(
      { email: req.body.email },
      { history: req.body.history },
      {
        new: true,
      }
    );
    console.log(account);
    res.json(account);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const account = new Account({
      email: req.body.register.account.email,
      name: req.body.register.account.name,
      lastName: req.body.register.account.lastName,
      history: req.body.register.account.history,
      playlist: req.body.register.account.playlist,
    });

    const newacc = await account.save();

    const hashedPassowrd = await bcrypt.hash(req.body.register.user.password, 10);
    const user = new User({
      email: req.body.register.user.email,
      password: hashedPassowrd,
      referenceId: await account._id,
    });

    const newUser = await user.save();

    const beruf = new Beruf({
      computer: req.body.register.beruf.computer,
      bewegung: req.body.register.beruf.bewegung,
      auto: req.body.register.beruf.auto,
      heben: req.body.register.beruf.heben,
      sitzen: req.body.register.beruf.sitzen,
      referenceId: await account._id,
    });
    const newBeruf = await beruf.save();

    const obj = { referenceId: await account._id };

    for (const key of Object.keys(req.body.register.health)) {
      obj[`${key}`] = req.body.register.health[`${key}`];
    }
    const gesundheit = new Gesundheit(obj);
    const newGesundheit = await gesundheit.save();

    const payment = new Payment({
      referenceId: await account._id,
      subType: "",
      paymentType: null,
      endDate: null,
    });
    const newPayment = await payment.save();

    res.status(200).send(true);
  } catch (error) {
    res.send(false);
    res.json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const loginUser = await User.findOne({ email: req.body.user.email });

  if (loginUser == null) {
    return res.status(200).send(false);
  }
  try {
    if (await bcrypt.compare(req.body.user.password, loginUser.password)) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/checkMail", async (req, res) => {
  const loginUser = await User.findOne({ email: req.body.email });

  if (loginUser == null) {
    return res.status(200).send(false);
  } else {
    res.send(true);
  }
});

router.get("/:usermail", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.usermail });

    res.json(user);
  } catch (error) {
    res.json({});
  }
});
router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.json(user);
  } catch (error) {
    res.json({});
  }
});

module.exports = router;
