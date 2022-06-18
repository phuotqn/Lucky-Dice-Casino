const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const voucherHistoryModel = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    voucher: {
        type: mongoose.Types.ObjectId,
        ref:"voucher",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("voucherHistory",voucherHistoryModel);