const express = require("express");
const userStatsRouter = express.Router();
const { authorize } = require("../middlewares/authorization.js");

userStatsRouter.get("/", authorize(["manager"]), (req, res)=>{
    res.send("User Stats");
})

module.exports = { userStatsRouter }