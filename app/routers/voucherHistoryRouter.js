const express = require("express");
const voucherHistoryRouter = express.Router();
const {createVoucherHistory,getHistoryVoucherById,getAllVoucherHistory,updateHistoryVoucher,deleteVoucherHistory,getVoucherHistory } = require("../controller/voucherHistoryController")

voucherHistoryRouter.post("/voucherHistory",createVoucherHistory);
voucherHistoryRouter.get("/voucherHistory/:voucherHistoryId",getHistoryVoucherById);
voucherHistoryRouter.get("/voucherHistory",getAllVoucherHistory);
voucherHistoryRouter.get("/devcamp-lucky-dice/voucher-history",getVoucherHistory);
voucherHistoryRouter.put("/voucherHistory/:voucherHistoryId",updateHistoryVoucher);
voucherHistoryRouter.delete("/voucherHistory/:voucherHistoryId",deleteVoucherHistory);


module.exports = voucherHistoryRouter;
