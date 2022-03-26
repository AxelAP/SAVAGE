const mongoose = require("mongoose");

const mkSchema = new mongoose.Schema(
  {
    serverID: { type: String, require: true, unique: true },
    team1: { type: String, require: true },
    team2: { type: String, require: true },
    race: { type: Number, require: true },
    spots: { type: Array, default: [] },
    points: { type: Array, default: [] },
    played: { type: Array, default: [] },
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("mariokart", mkSchema);

module.exports = model;
