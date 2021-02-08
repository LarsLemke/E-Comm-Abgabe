const Payment = require("../modules/Payment");
const express = require("express");
const router = express.Router();
const paypalpayment = require("paypal-rest-sdk");
var events = require("events");

var eventEmitter = new events.EventEmitter();

paypalpayment.configure({
  mode: "sandbox", //sandbox or live
  //gelöscht muss erstetzt werden wenn mane s wieder zum laufen kriegen will
  client_id: "",
  client_secret: "",
});

const Paypal = require("paypal-recurring-se"),
  paypal = new Paypal(
    {
      //gelöscht muss erstetzt werden wenn mane s wieder zum laufen kriegen will
      username: "",
      password: "",
      signature: "",
    }
    //, "production" // USE WITH CARE!
  );

var price = 0;
var description = "";

router.post("/subscription", (req, res) => {
  price = req.body.price;
  description = req.body.description;
  // console.log(price + "  " + description);

  paypal.authenticate(
    {
      RETURNURL: "http://localhost:3000/payment/subsuccess",
      CANCELURL: "http://localhost:3000/payment/cancel",
      PAYMENTREQUEST_0_AMT: price,
      L_BILLINGAGREEMENTDESCRIPTION0: description,
    },
    function (err, data, url) {
      // Redirect the user if everything went well with
      // a HTTP 302 according to PayPal's guidelines
      var returnUrl = {
        url: url,
      };
      if (!err) {
        res.json(returnUrl);
      }
      if (err) {
        console.log(err);
      }
    }
  );
});

router.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4200/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "25.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

router.get("/subsuccess", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.token;
  console.log(price, description);

  paypal.createSubscription(
    paymentId,
    payerId,
    {
      AMT: price,
      DESC: description,
      BILLINGPERIOD: "Month",
      BILLINGFREQUENCY: 1,
    },
    function (err, data) {
      if (!err) {
        res.sendStatus(200);
      }
    }
  );
  eventEmitter.emit("scream");
});

router.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00",
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      // console.log(error.response);
      throw error;
    } else {
      // console.log(JSON.stringify(payment));
      res.send("Success");
    }
  });

  eventEmitter.emit("scream");
});

router.get("/cancel", (req, res) => res.send("Cancelled"));

router.get("/getStockUpdate", function (req, res, next) {
  res.set("Content-Type", "text/event-stream;charset=utf-8");
  res.set("Cache-Control", "no-cache");

  eventEmitter.on("scream", function () {
    console.log("send returns");

    res.write("event:" + "paypal\n");
    res.write("data:" + "succses" + "\n\n");
  });

  // res.write("data:" + JSON.stringify(response.data) + "\n\n");
});

module.exports = router;
