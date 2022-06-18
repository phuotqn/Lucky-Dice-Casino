const prizeModel = require("../model/prizeModel");
const mongoose = require("mongoose");

const getAllPrize = (request,response) => {
    prizeModel.find((error,data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success!! All Prize: ",
                data: data
            })
        }
    })
};
const createPrize = (request,response) => {
    let requestBody = request.body;
    let prizeCreate = {
        _id: mongoose.Types.ObjectId(),
        name: requestBody.name,
        description: requestBody.description,
    }
    prizeModel.create(prizeCreate, (error, data) => {
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
const getPrizeById = (request,response) => {
    let prizeId = request.params.prizeId;
    if(!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Prize ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    prizeModel.findById(prizeId, (error, data) => {
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
const updatePrizeById = (request,response) => {
    let prizeId = request.params.prizeId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }
    let prizeUpdate = {
        name: bodyRequest.name,
        description: bodyRequest.description,
    }
    prizeModel.findByIdAndUpdate(prizeId,prizeUpdate, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Prize updated successfully",
                data: data
            })
        }
    })
}
const deletePrizeById = (request,response) => {
    let prizeId = request.params.prizeId;
    prizeModel.findByIdAndDelete(prizeId, (error,data) => {
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

module.exports = {
    getAllPrize: getAllPrize,
    createPrize: createPrize,
    getPrizeById:getPrizeById,
    updatePrizeById: updatePrizeById,
    deletePrizeById:deletePrizeById
}
