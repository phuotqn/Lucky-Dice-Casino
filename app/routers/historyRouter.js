const express = require("express");
const { createHistory,getAllHistory,getHistoryById,updateHistoryById,deleteHistoryById,getDiceHistory } = require("../controller/diceHistoryController");
const historyRouter = express.Router();

historyRouter.post("/history",createHistory);
historyRouter.get("/history",getAllHistory);
historyRouter.get("/history/:historyId",getHistoryById);
historyRouter.get("/devcamp-lucky-dice/dice-history/",getDiceHistory);
historyRouter.put("/history/:historyId",updateHistoryById);
historyRouter.delete("/history/:historyId",deleteHistoryById);
module.exports = historyRouter;