const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prizeHistoryModel = new Schema({
    _id:{
        type: mongoose.Types.ObjectId,
    }, 
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        
    },
    prize: {
        type: mongoose.Types.ObjectId,
        ref:"prize",
       
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
module.exports = mongoose.model("prizeHistory",prizeHistoryModel);