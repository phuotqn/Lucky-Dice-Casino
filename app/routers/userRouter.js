const express = require("express");
const { createUser,getAllUsers,getUserById,updateUserById,deleteUserById } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/users",createUser);
userRouter.get("/users",getAllUsers);
userRouter.get("/users/:userId",getUserById);
userRouter.put("/users/:userId",updateUserById);
userRouter.delete("/users/:userId",deleteUserById);
module.exports = userRouter;

