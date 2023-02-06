const express = require("express");
const newTokenRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/user.model.js");

newTokenRouter.get("/",  async (req, res)=>{
    try {
        const {refreshToken} = req.cookies;
        jwt.verify(refreshToken, process.env.refreshkey, (err, decoded) => {
           if(!decoded){
            res.status(401).json({"msg":"Login Again"});
           } else {
            const user = UserModel.find({_id:decoded.user_id});
            const token = jwt.sign({user_id:user._id, user_role: user.role}, process.env.key, {expiresIn:"1m"});    
            res.json({token});
           }
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
    
})


module.exports = { newTokenRouter }