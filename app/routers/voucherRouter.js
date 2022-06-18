const express = require("express");
const voucherRouter = express.Router();
const { createVoucher,getAllVoucher,getVoucherById,updateVoucherById,deleteVoucherById} = require("../controller/voucherController");

voucherRouter.post("/vouchers",createVoucher);
voucherRouter.get("/vouchers",getAllVoucher);
voucherRouter.get("/vouchers/:voucherId",getVoucherById);
voucherRouter.put("/vouchers/:voucherId",updateVoucherById);
voucherRouter.delete("/vouchers/:voucherId",deleteVoucherById)

module.exports = voucherRouter;
