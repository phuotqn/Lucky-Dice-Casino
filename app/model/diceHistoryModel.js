const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const diceHistoryModel = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    user: 
        {type: mongoose.Types.ObjectId,
            ref: "user"},
    dice: {
        type: Number,
        require: true,
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
module.exports = mongoose.model("diceHistory",diceHistoryModel);