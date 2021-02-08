const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  history: {
    type: String,
    require: false,
  },
  playlist: {
    type: String,
    require: false,
  },
  lastWatched: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
