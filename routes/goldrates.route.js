const express = require("express");
const goldRouter = express.Router();

goldRouter.get("/", (req, res) => {
    res.json("Gold Rates")
})

module.exports = { goldRouter }