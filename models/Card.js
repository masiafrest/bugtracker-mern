const { Schema, model } = require("mongoose");

const cardShema = new Schema(
  {
    content: { type: String, required: true },
    date: {
      type: Date,
      default: Date.now
    },
    status: String,
    btnStatus: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = model("Card", cardShema);
