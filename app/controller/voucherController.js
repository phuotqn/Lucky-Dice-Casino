const mongoose = require("mongoose");
const voucherModel = require('../model/voucherModel');

const createVoucher = (request,response) => {
    let requestBody = request.body;
    //B2: Validate dữ liệu
    if(!(Number.isInteger(requestBody.discount) && requestBody.discount > 0 &&requestBody.discount<=100)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Percent discount is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    let createVoucher = {
        _id: mongoose.Types.ObjectId(),
        code: requestBody.code,
        discount: requestBody.discount,
        note: requestBody.note,
    }

    voucherModel.create(createVoucher, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: Voucher created",
                data: data
            })
        }
    })
};
const getAllVoucher = (request,response) => {
    let user = request.query.user;
    let condition = {};
    if(user){
        condition.user = user;
    }
    voucherModel.find((error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success!! All Voucher: ",
                data: data
            })
        }
    })
};
const getVoucherById = (request,response) => {
    let voucherId = request.params.voucherId;
    if(!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    voucherModel.findById(voucherId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get prize success",
                data: data
            })
        }
    })
};
const updateVoucherById = (request,response) => {
    let voucherId = request.params.voucherId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }
    if(!(Number.isInteger(bodyRequest.discount) && bodyRequest.discount > 0 &&bodyRequest.discount<=100)){
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Percent  Discount is not valid"
        })
    }
    let voucherUpdate = {
        code: bodyRequest.code,
        discount: bodyRequest.discount,
        note: bodyRequest.note,
    }
    voucherModel.findByIdAndUpdate(voucherId,voucherUpdate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Voucher updated successfully",
                data: data
            })
        }
    })
};
const deleteVoucherById = (request,response) => {
    let voucherId = request.params.voucherId;
    voucherModel.findByIdAndDelete(voucherId,(error,data) => {
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
module.exports = {
    createVoucher:createVoucher,
    getAllVoucher:getAllVoucher,
    getVoucherById:getVoucherById,
    updateVoucherById:updateVoucherById,
    deleteVoucherById:deleteVoucherById,
}