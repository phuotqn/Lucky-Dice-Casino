const express = require("express");
const port = 4000;
const app = express();
const path = require("path");
var mongoose = require("mongoose");
const userRouter = require("./app/routers/userRouter");
const historyRouter = require("./app/routers/historyRouter");
const prizeRouter = require("./app/routers/prizeRouter");
const voucherRouter = require("./app/routers/voucherRouter");
const prizeHistoryRouter = require("./app/routers/prizeHistoryRouter");
const voucherHistoryRouter = require("./app/routers/voucherHistoryRouter");
const diceRouter = require("./app/routers/diceRouter");
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
mongoose.connect("mongodb://localhost:27017/Lucky_Dice_Casino",(err) => {
    if(err) {
        throw err;
    }
    console.log("Connect successfully");
});
app.use((request,response,next) => {
    console.log("Request method ", request.method);
    next();
})
app.use((request,response,next) => {
    console.log("Time", new Date());
    next();
})
app.get("/",(req,res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + "/view/(Bai_Lam)_Task_31.30.html"));
});
app.use(express.static(path.join(__dirname + "/view")));
app.get("/random-number",(req,res) => {
    let number = Math.floor((Math.random()*6)+1);
    res.status(200).json({
        Dice : number,
    })
});
app.use("/",userRouter);
app.use("/",historyRouter);
app.use("/",prizeRouter);
app.use("/",voucherRouter);
app.use("/",prizeHistoryRouter);
app.use("/",voucherHistoryRouter);
app.use("/",diceRouter);
app.listen(port, () => {
    console.log("App running on port " + port);
})
