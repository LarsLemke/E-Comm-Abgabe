const express = require("express");
const router = express.Router();
const KI = require("../modules/KI");
const Account = require("../modules/Account");
const Beruf = require("../modules/Beruf");
const Gesundheit = require("../modules/Gesundheit");
const fs = require("fs");

const { spawn } = require("child_process");

router.post("/getPlaylist", (req, res) => {
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

router.get("/createCSV", async (req, res) => {
  try {
    console.log("create CSV");
    const kibogen = await KI.find();

    var alllines1 = "";
    var alllines2 = "";
    for (let index = 0; index < kibogen.length; index++) {
      const elem = kibogen[index];
      var oneline = "";
      if (index < 300) {
        oneline += elem.computer + ",";
        oneline += elem.bewegung + ",";
        oneline += elem.auto + ",";
        oneline += elem.heben + ",";
        oneline += elem.sitzen + ",";
        oneline += elem.schmerzenRuecken + ",";
        oneline += elem.schmerzenNacken + ",";
        oneline += elem.schmerzenHandgelenk + ",";
        oneline += elem.schmerzenKnie + ",";
        oneline += elem.schmerzenHuefte + ",";
        oneline += elem.schmerzenSchulter + ",";
        oneline += elem.schmerzenFussgelenke + ",";
        oneline += elem.Beine + ",";
        oneline += elem.Ruecken + ",";
        oneline += elem.Oberkoerper;
        oneline += "\n";
        alllines1 += oneline;
      } else {
        oneline += elem.computer + ",";
        oneline += elem.bewegung + ",";
        oneline += elem.auto + ",";
        oneline += elem.heben + ",";
        oneline += elem.sitzen + ",";
        oneline += elem.schmerzenRuecken + ",";
        oneline += elem.schmerzenNacken + ",";
        oneline += elem.schmerzenHandgelenk + ",";
        oneline += elem.schmerzenKnie + ",";
        oneline += elem.schmerzenHuefte + ",";
        oneline += elem.schmerzenSchulter + ",";
        oneline += elem.schmerzenFussgelenke + ",";
        oneline += elem.Beine + ",";
        oneline += elem.Ruecken + ",";
        oneline += elem.Oberkoerper;
        oneline += "\n";
        alllines2 += oneline;
      }
    }

    fs.writeFileSync(__dirname + "/Boegen0_299.csv", alllines1, () => {});

    fs.writeFileSync(__dirname + "/Boegen300_401.csv", alllines2, () => {});

    res.json(alllines2);
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/createUbergabeCSV", async (req, res) => {
  try {
    console.log("createUbergabeCSV");
    const elem = req.body;
    const id = req.body.id;

    var oneline = "";

    oneline += elem.beruf.computer + ",";
    oneline += elem.beruf.bewegung + ",";
    oneline += elem.beruf.auto + ",";
    oneline += elem.beruf.heben + ",";
    oneline += elem.beruf.sitzen + ",";
    oneline += elem.gesundheit.schmerzenRuecken + ",";
    oneline += elem.gesundheit.schmerzenNacken + ",";
    oneline += elem.gesundheit.schmerzenHandgelenk + ",";
    oneline += elem.gesundheit.schmerzenKnie + ",";
    oneline += elem.gesundheit.schmerzenHuefte + ",";
    oneline += elem.gesundheit.schmerzenSchulter + ",";
    oneline += elem.gesundheit.schmerzenFussgelenke;
    // oneline += elem.gesundheit.Beine + ",";
    // oneline += elem.gesundheit.Ruecken + ",";
    // oneline += elem.gesundheit.Oberkoerper;
    oneline += "\n";
    oneline += "0,0,0,0,0,0,0,0,0,0,0,0";
    console.log(oneline);
    fs.writeFileSync("./python-ki/Uebergabe.csv", oneline, () => {});

    res.send(true);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/phytontest", async (req, res) => {
  try {
    res.json();
  } catch (error) {
    res.json({});
  }
});

router.get("/", async (req, res) => {
  try {
    const kibogen = await KI.find();
    res.json(kibogen);
  } catch (error) {
    res.json({});
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const updatePost = await KI.updateOne(
      { _id: req.body.id },
      {
        $set: {
          Beine: req.body.Beine ? 1 : 0,
          Ruecken: req.body.Ruecken ? 1 : 0,
          Oberkoerper: req.body.Oberkoerper ? 1 : 0,
        },
      }
    );
    res.send(true);
  } catch (error) {
    res.json({ message: error });
  }
});

//generate bögen
router.get("/300", async (req, res) => {
  try {
    for (let index = 0; index < 100; index++) {
      const newKI = new KI({
        auswertung: null,
        computer: random(1, 10),
        bewegung: random(1, 10),
        auto: random(1, 10),
        heben: random(1, 10),
        sitzen: random(1, 10),
        schmerzenNow: random(1, 10),
        schmerzenRuecken: random(1, 10),
        schmerzenNacken: random(1, 10),
        schmerzenHandgelenk: random(1, 10),
        schmerzenKnie: random(1, 10),
        schmerzenHuefte: random(1, 10),
        schmerzenSchulter: random(1, 10),
        schmerzenFussgelenke: random(1, 10),
        toggelBeweglichket: randombool(),
        schmerzenBrennen: randombool(),
        schmerzenKribbeln: randombool(),
        schmerzenTaubheit: randombool(),
        schmerzenUeberempfindlichkeit: randombool(),
        toggelkraft: randombool(),
        schmerzenNadeln: randombool(),
        schmerzenArbeiten: randombool(),
        schmerzenLaufen: randombool(),
        schmerzenBuecken: randombool(),
        schmerzenStress: randombool(),
        schmerzenWetter: randombool(),
        schmerzenSpringen: randombool(),
      });

      fullki = await newKI.save();
    }

    res.sendStatus(200);
  } catch (error) {
    res.json({});
  }
});

function random(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function randombool() {
  return Math.random() >= 0.5;
}

module.exports = router;
