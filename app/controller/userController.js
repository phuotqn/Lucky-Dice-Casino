const userModel = require("../model/userModel");
const mongoose = require("mongoose");

const createUser = (request,response) => {
    let bodyRequest = request.body;
    let createUser = {
        _id: mongoose.Types.ObjectId(),
        userName: bodyRequest.userName,
        firstName: bodyRequest.firstName,
        lastName: bodyRequest.lastName
    }
    userModel.create(createUser, (error,data) => {
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
const getAllUsers = (request,response) => {
    
    userModel.find((error,data) => {
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
const getUserById = (request,response) => {
    let userId = request.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }
    //B3: Thao tác với cơ sở dữ liệu
    userModel.findById(userId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 400: Bad request",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get user success",
                data: data
            })
        }
    })
};
const updateUserById = (request,response) => {
    let userId = request.params.userId;
    let bodyRequest = request.body;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }
    let userUpdate = {
        userName: bodyRequest.userName,
        firstName: bodyRequest.firstName,
        lastName: bodyRequest.lastName,
    }
    userModel.findByIdAndUpdate(userId,userUpdate, (error, data) => {
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
const deleteUserById = (request,response) => {
    let userId = request.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }
    userModel.findByIdAndDelete(userId, (error, data) => {
        if(error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(204).json({
                status: "Success: Delete User success"
            })
        }
    })
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById
}

