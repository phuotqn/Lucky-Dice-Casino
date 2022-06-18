const diceHistoryModel = require("../model/diceHistoryModel");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");

const createHistory = (request,response) => {
    let requestBody = request.body;
    if(!(Number.isInteger(requestBody.dice) && requestBody.dice > 0 && requestBody.dice <7 )) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Dice is not valid"
        })
    }
    let createHistory = {
        _id: mongoose.Types.ObjectId(),
        user: requestBody.user,
        dice: requestBody.dice,
    }

    diceHistoryModel.create(createHistory, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: User created",
                data: data
            })
        }
    })
};
const getAllHistory = (request,response) => {
    let user = request.query.user;
    let condition = {}
    if(user){
        condition.user = user;
    }
    diceHistoryModel.find((error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: All Users: ",
                data: data
            })
        }
    })
};
const getHistoryById = (request,response) => {
    let historyId = request.params.historyId;
    if(!mongoose.Types.ObjectId.isValid(historyId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "History ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    diceHistoryModel.findById(historyId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get history success",
                data: data
            })
        }
    })
};
const updateHistoryById = (request,response) => {
    let historyId = request.params.historyId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(historyId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "History ID is not valid"
        })
    }
    let historyUpdate = {
        dice: bodyRequest.dice,
    }
    diceHistoryModel.findByIdAndUpdate(historyId,historyUpdate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: User updated successfully",
                data: data
            })
        }
    })
};
const deleteHistoryById = (request,response) => {
    let historyId = request.params.historyId;
    if(!mongoose.Types.ObjectId.isValid(historyId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "History ID is not valid"
        })
    }
    diceHistoryModel.findByIdAndDelete(historyId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(204).json({
                status: "Success: Delete History success"
            })
        }
    })
}
const getDiceHistory = (request,response) => {
    let username = request.query.username;
    userModel.find({ username: request.query.username }).lean().exec(function (error, histories) {
        for (let bI = 0; bI < histories.length; bI++) {
            // B2: Validate dữ liệu
            // B3: tương tác với cơ sở dữ liệu
            let condition = {};
            condition.user = histories[bI]._id;
            console.log(condition)
            diceHistoryModel.find(condition, (error, data) => {
                if (error) {
                    return response.status(500).json({
                        status: "Không tìm thấy User",
                        data: {}
                    })
                } else {
                    return response.status(200).json({
                        status: "Success: Get all history success",
                        data: data,
                    })
                }
            })
        }
    });
}
module.exports = {
    createHistory: createHistory,
    getAllHistory: getAllHistory,
    getHistoryById: getHistoryById,
    updateHistoryById:updateHistoryById,
    deleteHistoryById: deleteHistoryById,
    getDiceHistory:getDiceHistory
}