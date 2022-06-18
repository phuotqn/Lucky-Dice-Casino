const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    username : {
        type: String,
        unique: true,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
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
module.exports = mongoose.model("user",userModel);

