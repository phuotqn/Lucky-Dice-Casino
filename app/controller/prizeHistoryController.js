const mongoose = require("mongoose");
const prizeHistoryModel = require("../model/prizeHistoryModel");
const userModel = require("../model/userModel");
const createPrizeHistory = (request,response) => {
    let requestBody = request.body;
    let prizeHistoryCreate = {
        _id: mongoose.Types.ObjectId(),
        user: requestBody.user,
        prize: requestBody.prize,
    }
    prizeHistoryModel.create(prizeHistoryCreate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: Prize History created",
                data: data
            })
        }
    })
};
const getAllPrizeHistory = (request,response) => {
    let user = request.query.user;
    let condition = {};
    if(user){
        condition.user = user;
    }
    prizeHistoryModel.find((error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success!! All Prize History: ",
                data: data
            })
        }
    })
};
const getPrizeHistoryById = (request,response) => {
    let prizeHistoryId = request.params.prizeHistoryId;
    if(!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize History ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    prizeHistoryModel.findById(prizeHistoryId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get prize history success",
                data: data
            })
        }
    })
};
const updatePrizeHistory = (request,response) => {
    let prizeHistoryId = request.params.prizeHistoryId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize ID is not valid"
        })
    }
    let prizeHistoryUpdate = {
        user: bodyRequest.user,
        prize: bodyRequest.prize,
    }
    prizeHistoryModel.findByIdAndUpdate(prizeHistoryId,prizeHistoryUpdate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Prize History updated successfully",
                data: data
            })
        }
    })
};
const deletePrizeHistory = (request,response) => {
    let prizeHistoryId = request.params.prizeHistoryId;
    prizeHistoryModel.findByIdAndDelete(prizeHistoryId, (error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Prize Delete successfully",
                data: data
            })
        }
    })
}
const getPrizeHistory = (request,response) => {
    let username = request.query.username;
    userModel.find({ username: request.query.username }).lean().exec(function (error, histories) {
        for (let bI = 0; bI < histories.length; bI++) {
            // B2: Validate dữ liệu
            // B3: tương tác với cơ sở dữ liệu
            let condition = {};
            condition.user = histories[bI]._id;
            console.log(condition)
            prizeHistoryModel.find(condition).populate("prize").exec((error, data) => {
                if (error) {
                    return response.status(500).json({
                        status: "Không tìm thấy User",
                        data: {}
                    })
                } else {
                    return response.status(200).json({
                        status: "Success: Get all prize history success",
                        data: data,
                    })
                }
            })
        }
    });
}
module.exports = {
    createPrizeHistory:createPrizeHistory,
    getAllPrizeHistory:getAllPrizeHistory,
    getPrizeHistoryById:getPrizeHistoryById,
    updatePrizeHistory:updatePrizeHistory,
    deletePrizeHistory:deletePrizeHistory,
    getPrizeHistory:getPrizeHistory
}