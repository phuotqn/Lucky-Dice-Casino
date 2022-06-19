const { request } = require("express");
const mongoose = require("mongoose");
const voucherHistoryModel = require("../model/voucherHistoryModel");
const voucherController = require("./voucherController");
const userModel = require("../model/userModel");
const createVoucherHistory = (request,response) => {
    let requestBody = request.body;
    //B2: Validate dữ liệu
    //B3: Thao tác với cơ sở dữ liệu
    let createVoucher = {
        _id: mongoose.Types.ObjectId(),
        user: requestBody.user,
        voucher: requestBody.voucher,
    }
    voucherHistoryModel.create(createVoucher, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: Voucher History created",
                data: data
            })
        }
    })
};
const getAllVoucherHistory = (request,response) => {
    voucherHistoryModel.find((error,data) => {
        if(error) {
            return response.status(400).json({
                message:"Bad Request",
                data: data,
            });
        }else{
            return response.status(200).json({
                status: "Success!! All Voucher History: ",
                data: data
            })
        }
    })
};
const getHistoryVoucherById = (request,response) => {
    let voucherHistoryId = request.params.voucherHistoryId;
    if(!mongoose.Types.ObjectId.isValid(voucherHistoryId)){
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize ID is not valid"
    })
    }
    voucherHistoryModel.findById(voucherHistoryId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get voucher  history success",
                data: data
            })
        }
    })
};
const updateHistoryVoucher = (request,response) => {
    let voucherHistoryId = request.params.voucherHistoryId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize ID is not valid"
        })
    }
    let voucherHistoryUpdate = {
        user: bodyRequest.user,
        voucher: bodyRequest.voucher,
    }
    prizeHistoryModel.findByIdAndUpdate(voucherHistoryId,voucherHistoryUpdate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Voucher History updated successfully",
                data: data
            })
        }
    })
}
const deleteVoucherHistory = (request,response) => {
    let voucherHistoryId = request.params.voucherHistoryId
    voucherHistoryModel.findByIdAndDelete(voucherHistoryId,(error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Voucher Delete successfully",
                data: data
            })
        }
    })
}
const getVoucherHistory = (request,response) => {
    let username = request.query.username;
    userModel.find({ username: request.query.username }).lean().exec(function (error, histories) {
        for (let bI = 0; bI < histories.length; bI++) {
            // B2: Validate dữ liệu
            // B3: tương tác với cơ sở dữ liệu
            let condition = {};
            condition.user = histories[bI]._id;
            console.log(condition)
            voucherHistoryModel.find(condition).populate("voucher").exec((error, data) => {
                if (error) {
                    return response.status(500).json({
                        status: "Không tìm thấy User",
                        data: {}
                    })
                } else {
                    return response.status(200).json({
                        status: "Success: Get all voucher history success",
                        data: data,
                    })
                }
            })
        }
    });
}
module.exports = {
    createVoucherHistory:createVoucherHistory,
    getAllVoucherHistory:getAllVoucherHistory,
    getHistoryVoucherById:getHistoryVoucherById,
    updateHistoryVoucher:updateHistoryVoucher,
    deleteVoucherHistory:deleteVoucherHistory,
    getVoucherHistory:getVoucherHistory
}