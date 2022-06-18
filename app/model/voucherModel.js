const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const voucherModel = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    discount: {
        type: Number,
        require: true,
    },
    note: {
        type: String,
        require: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})
module.exports = mongoose.model("voucher",voucherModel);