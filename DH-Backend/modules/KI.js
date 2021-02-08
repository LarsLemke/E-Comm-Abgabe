const mongoose = require("mongoose");
const Beruf = require("./Beruf");
const Gesundheit = require("./Gesundheit");

const KISchema = mongoose.Schema({
  computer: {
    type: Number,
    require: false,
  },
  bewegung: {
    type: Number,
    require: false,
  },
  auto: {
    type: Number,
    require: false,
  },
  heben: {
    type: Number,
    require: false,
  },
  sitzen: {
    type: Number,
    require: false,
  },
  schmerzenNow: {
    type: Number,
    require: false,
  },
  schmerzenRuecken: {
    type: Number,
    require: false,
  },
  schmerzenNacken: {
    type: Number,
    require: false,
  },
  schmerzenHandgelenk: {
    type: Number,
    require: false,
  },
  schmerzenKnie: {
    type: Number,
    require: false,
  },
  schmerzenHuefte: {
    type: Number,
    require: false,
  },
  schmerzenSchulter: {
    type: Number,
    require: false,
  },
  schmerzenFussgelenke: {
    type: Number,
    require: false,
  },

  toggelBeweglichket: {
    type: Boolean,
    require: false,
  },
  schmerzenBrennen: {
    type: Boolean,
    require: false,
  },
  schmerzenKribbeln: {
    type: Boolean,
    require: false,
  },
  schmerzenTaubheit: {
    type: Boolean,
    require: false,
  },
  schmerzenUeberempfindlichkeit: {
    type: Boolean,
    require: false,
  },
  toggelkraft: {
    type: Boolean,
    require: false,
  },
  schmerzenNadeln: {
    type: Boolean,
    require: false,
  },

  schmerzenArbeiten: {
    type: Boolean,
    require: false,
  },
  schmerzenLaufen: {
    type: Boolean,
    require: false,
  },
  schmerzenBuecken: {
    type: Boolean,
    require: false,
  },
  schmerzenStress: {
    type: Boolean,
    require: false,
  },
  schmerzenWetter: {
    type: Boolean,
    require: false,
  },
  schmerzenSpringen: {
    type: Boolean,
    require: false,
  },

  Beine: {
    type: Number,
    require: false,
  },
  Ruecken: {
    type: Number,
    require: false,
  },
  Oberkoerper: {
    type: Number,
    require: false,
  },
});

module.exports = mongoose.model("KI", KISchema);
