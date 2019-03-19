const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  }
});

const Token = mongoose.model("Tokens", TokenSchema);

module.exports = Token;
