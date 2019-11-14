const cardCtrl = {};

const CardModel = require("../models/Card");

cardCtrl.getCards = async (req, res) => {
  const cards = await CardModel.find();
  res.json(cards);
};

cardCtrl.createCard = async (req, res) => {
  const { content, date, status, btnStatus } = req.body;
  const newCard = new CardModel({
    content: content,
    date: date,
    status,
    btnStatus
  });
  await newCard.save();
  res.json({ message: "card saved" });
};

cardCtrl.getCard = async (req, res) => {
  const card = await CardModel.findById(req.params.id);
  res.json(card);
};

cardCtrl.updateCard = async (req, res) => {
  const { content, status, btnStatus } = req.body;
  await CardModel.findByIdAndUpdate(req.params.id, {
    content,
    status,
    btnStatus
  });
  const cards = await CardModel.find();
  res.json(cards);
};

cardCtrl.deleteCard = async (req, res) => {
  await CardModel.findByIdAndDelete(req.params.id);
  res.json({ message: "card deleted" });
};
module.exports = cardCtrl;
