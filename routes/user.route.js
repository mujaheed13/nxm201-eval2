const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { LogoutModel } = require("../models/logout.model.js");

userRouter.post("/signup", (req, res)=>{
    try {
        const { email, name, password, role } = req.body;
        bcrypt.hash(password, 5, async(err, hashed_pass)=>{
            if(hashed_pass){
                const user = new UserModel({email, password:hashed_pass, role, name});
                await user.save();
                res.status(201).json({msg: "Sign Up Successful"});
            } else {
                console.log(err)
                res.status(500).json({errMsg:err.message});
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
})

userRouter.post("/login", async (req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(404).json({msg:"User not found"});
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if(result){
            const token = jwt.sign({user_id:user._id, user_role: user.role}, process.env.key, {expiresIn:"1m"});
            const refreshToken = jwt.sign({user_id:user._id, user_role: user.role}, process.env.refreshkey, {expiresIn:"5m"});
            res.cookie("refreshToken", refreshToken);
            res.json({msg:"Login Successful", token});
          } else {
            res.status(401).json({msg:"Wrong Credentials"});
          }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
})

userRouter.post("/logout", async(req, res)=>{
    const token = req.header.authorization?.split(' ')[1];
    try {
        const log = new LogoutModel({token});
        await log.save();
        res.send("Logout Successful");
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
})


module.exports = { userRouter }