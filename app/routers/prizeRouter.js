const express = require("express");
const prizeRouter = express.Router();
const { getAllPrize,createPrize,getPrizeById,updatePrizeById,deletePrizeById } = require("../controller/prizeController");

prizeRouter.get("/prize",getAllPrize);
prizeRouter.post("/prize",createPrize);
prizeRouter.get("/prize/:prizeId",getPrizeById);
prizeRouter.put("/prize/:prizeId",updatePrizeById);
prizeRouter.delete("/prize/:prizeId",deletePrizeById);
module.exports = prizeRouter;
