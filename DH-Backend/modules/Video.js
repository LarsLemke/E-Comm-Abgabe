const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  nacken: {
    type: Number,
    require: true,
  },
  ruecken: {
    type: Number,
    require: true,
  },
  handgelenke: {
    type: Number,
    require: true,
  },
  knie: {
    type: Number,
    require: true,
  },
  huefte: {
    type: Number,
    require: true,
  },
  schulter: {
    type: Number,
    require: true,
  },
  fussgelenke: {
    type: Number,
    require: true,
  },
  titel: {
    type: String,
    require: true,
  },
  beschreibung: {
    type: String,
    require: true,
  },
  playlist: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Video", VideoSchema);
