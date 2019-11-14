const { Router } = require("express");
const router = Router();

const {
  getCards,
  createCard,
  getCard,
  deleteCard,
  updateCard
} = require("../controllers/cards.controller");

router
  .route("/")
  .get(getCards)
  .post(createCard);

router
  .route("/:id")
  .delete(deleteCard)
  .put(updateCard)
  .get(getCard);

module.exports = router;
