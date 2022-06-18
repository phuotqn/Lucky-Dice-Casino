const express = require('express');
const prizeHistoryRouter = express.Router();
const { createPrizeHistory,getAllPrizeHistory,getPrizeHistoryById,updatePrizeHistory,deletePrizeHistory,getPrizeHistory } = require("../controller/prizeHistoryController")
prizeHistoryRouter.post("/prizeHistory",createPrizeHistory);
prizeHistoryRouter.get("/prizeHistory",getAllPrizeHistory);
prizeHistoryRouter.get("/prizeHistory/:prizeHistoryId",getPrizeHistoryById);
prizeHistoryRouter.get("/devcamp-lucky-dice/prizeHistory",getPrizeHistory);
prizeHistoryRouter.put("/prizeHistory/:prizeHistoryId",updatePrizeHistory);
prizeHistoryRouter.delete("/prizeHistory/:prizeHistoryId",deletePrizeHistory);
module.exports = prizeHistoryRouter;