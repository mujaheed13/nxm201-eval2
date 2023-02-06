const jwt = require("jsonwebtoken");
require("dotenv").config();
const { LogoutModel } = require("../models/logout.model.js");

const authenticate = async (req, res, next) => {
    const blacklistedtokens = await LogoutModel.find();
    const token = req.headers.authorization?.split(' ')[1];
    if(!blacklistedtokens.includes(token)){
    jwt.verify(token, process.env.key, (err, decoded) => {
        if(decoded){
            const {user_role} = decoded;
            req.body.user_role = user_role; 
            next();
        } else {
            res.status(401).json({msg:err.message});
        } 
      });
    } else {
        res.status(401).json("Please Login Again");
    }
}

module.exports = { authenticate }