const express = require("express");
const diceRouter = express.Router();
const {diceHandler} = require("../controller/diceController");

diceRouter.post("/devcamp-lucky-dice/dice",diceHandler);

module.exports = diceRouter;