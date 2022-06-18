const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prizeModel = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description : {
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
module.exports = mongoose.model("prize", prizeModel);