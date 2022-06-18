const mongoose = require("mongoose");

const diceHistoryModel = require("../model/diceHistoryModel");
const prizeHistoryModel = require("../model/prizeHistoryModel");
const prizeModel = require("../model/prizeModel");
const userModel = require("../model/userModel");
const voucherHistoryModel = require("../model/voucherHistoryModel");
const voucherModel = require("../model/voucherModel");

const diceHandler = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    let username = request.body.username;
    let firstname = request.body.firstname;
    let lastname = request.body.lastname;

    // Random 1 giá trị xúc xắc bất kỳ
    let dice = Math.floor(Math.random() * 6 + 1);

    // B2: Validate dữ liệu từ request body
    if (!username) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "Username is required"
        })
    }

    if (!firstname) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "Firstname is required"
        })
    }

    if (!lastname) {
        return response.status(400).json({
            status: "Error 400: Bad request",
            message: "Lastname is required"
        })
    }

    // Sử dụng userModel tìm kiếm bằng username
    userModel.findOne({
        username: username
    }, (errorFindUser, userExist) => {
        if (errorFindUser) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: errorFindUser.message
            })
        } else {
            if (!userExist) {
                // Nếu user không tồn tại trong hệ thống
                // Tạo user mới
                userModel.create({
                    _id: mongoose.Types.ObjectId(),
                    username: username,
                    firstname: firstname,
                    lastname: lastname
                }, (errCreateUser, userCreated) => {
                    if (errCreateUser) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: errCreateUser.message
                        })
                    } else {
                        // Xúc xắc 1 lần, lưu lịch sử vào Dice History
                        diceHistoryModel.create({
                            _id: mongoose.Types.ObjectId(),
                            user: userCreated._id,
                            dice: dice
                        }, (errorDiceHistoryCreate, diceHistoryCreated) => {
                            if (errorDiceHistoryCreate) {
                                return response.status(500).json({
                                    status: "Error 500: Internal server error",
                                    message: errorDiceHistoryCreate.message
                                })
                            } else {
                                if (dice < 3) {
                                    // Nếu dice < 3, không nhận được voucher và prize gì cả
                                    return response.status(200).json({
                                        dice: dice,
                                        prize: null,
                                        voucher: null
                                    })
                                } else {
                                    // Nếu dice > 3, thực hiện lấy random một giá trị voucher bất kỳ trong hệ thống
                                    voucherModel.count().exec((errorCountVoucher, countVoucher) => {
                                        let randomVoucher = Math.floor(Math.random() * countVoucher);

                                        voucherModel.findOne().skip(randomVoucher).exec((errorFindVoucher, findVoucher) => {
                                            // Lưu voucher History
                                            voucherHistoryModel.create({
                                                _id: mongoose.Types.ObjectId(),
                                                user: userCreated._id,
                                                voucher: findVoucher._id
                                            }, (errorCreateVoucherHistory, voucherHistoryCreated) => {
                                                if (errorCreateVoucherHistory) {
                                                    return response.status(500).json({
                                                        status: "Error 500: Internal server error",
                                                        message: errorCreateVoucherHistory.message
                                                    })
                                                } else {
                                                    if (errorCreateVoucherHistory) {
                                                        return response.status(500).json({
                                                            status: "Error 500: Internal server error",
                                                            message: errorCreateVoucherHistory.message
                                                        })
                                                    } else {
                                                        // User mới không có prize
                                                        return response.status(200).json({
                                                            dice: dice,
                                                            prize: null,
                                                            voucher: findVoucher
                                                        })
                                                    }
                                                }
                                            })
                                        })
                                    })
                                }
                            }
                        })
                    }
                })
            } else {
                // Nếu user đã tồn tại trong hệ thống
                // Xúc xắc 1 lần, lưu lịch sử vào Dice History
                diceHistoryModel.create({
                    _id: mongoose.Types.ObjectId(),
                    user: userExist._id,
                    dice: dice
                }, (errorDiceHistoryCreate, diceHistoryCreated) => {
                    if (errorDiceHistoryCreate) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: errorDiceHistoryCreate.message
                        })
                    } else {
                        if (dice < 3) {
                            // Nếu dice < 3, không nhận được voucher và prize gì cả
                            return response.status(200).json({
                                dice: dice,
                                prize: null,
                                voucher: null
                            })
                        } else {
                            // Nếu dice > 3, thực hiện lấy random một giá trị voucher bất kỳ trong hệ thống
                            voucherModel.count().exec((errorCountVoucher, countVoucher) => {
                                let randomVoucher = Math.floor(Math.random() * countVoucher);

                                voucherModel.findOne().skip(randomVoucher).exec((errorFindVoucher, findVoucher) => {
                                    // Lưu voucher History
                                    voucherHistoryModel.create({
                                        _id: mongoose.Types.ObjectId(),
                                        user: userExist._id,
                                        voucher: findVoucher._id
                                    }, (errorCreateVoucherHistory, voucherHistoryCreated) => {
                                        if (errorCreateVoucherHistory) {
                                            return response.status(500).json({
                                                status: "Error 500: Internal server error",
                                                message: errorCreateVoucherHistory.message
                                            })
                                        } else {
                                            // Lấy 3 lần gieo xúc xắc gần nhất của user
                                            diceHistoryModel
                                                .find()
                                                .sort({
                                                    _id: -1
                                                })
                                                .limit(3)
                                                .exec((errorFindLast3DiceHistory, last3DiceHistory) => {
                                                    if (errorFindLast3DiceHistory) {
                                                        return response.status(500).json({
                                                            status: "Error 500: Internal server error",
                                                            message: errorFindLast3DiceHistory.message
                                                        })
                                                    } else {
                                                        // Nếu chưa ném đủ 3 lần, không nhận được prize
                                                        if (last3DiceHistory.length < 3) {
                                                            return response.status(200).json({
                                                                dice: dice,
                                                                prize: null,
                                                                voucher: findVoucher
                                                            })
                                                        } else {
                                                            console.log(last3DiceHistory)
                                                            // Kiểm tra 3 dice gần nhất
                                                            let checkHavePrize = true;
                                                            last3DiceHistory.forEach(diceHistory => {
                                                                if (diceHistory.dice < 3) {
                                                                    // Nếu 3 lần gần nhất có 1 lần xúc xắc nhỏ hơn 3 => không nhận được giải thưởng
                                                                    checkHavePrize = false;
                                                                }
                                                            });

                                                            if (!checkHavePrize) {
                                                                return response.status(200).json({
                                                                    dice: dice,
                                                                    prize: null,
                                                                    voucher: findVoucher
                                                                })
                                                            } else {
                                                                // Nếu đủ điều kiện nhận giải thưởng, tiến hành lấy random 1 prize trong prize Model
                                                                prizeModel.count().exec((errorCountPrize, countPrize) => {
                                                                    let randomPrize = Math.floor(Math.random() * countPrize);

                                                                    prizeModel.findOne().skip(randomPrize).exec((errorFindPrize, findPrize) => {
                                                                        // Lưu prize History
                                                                        prizeHistoryModel.create({
                                                                            _id: mongoose.Types.ObjectId(),
                                                                            user: userExist._id,
                                                                            prize: findPrize._id
                                                                        }, (errorCreatePrizeHistory, voucherPrizeCreated) => {
                                                                            if (errorCreatePrizeHistory) {
                                                                                return response.status(500).json({
                                                                                    status: "Error 500: Internal server error",
                                                                                    message: errorCreatePrizeHistory.message
                                                                                })
                                                                            } else {
                                                                                // Trả về kết quả cuối cùng
                                                                                return response.status(200).json({
                                                                                    dice: dice,
                                                                                    prize: findPrize,
                                                                                    voucher: findVoucher
                                                                                })
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                        }
                                                    }
                                                })
                                        }
                                    })
                                })
                            })
                        }
                    }
                })
            }
        }
    })
}

module.exports = {
    diceHandler
}