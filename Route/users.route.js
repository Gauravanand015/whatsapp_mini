const express = require("express");
const { UserModel } = require("../Model/user.model");
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,pro_pic} = req.body;
    const userDetails = await UserModel.find({email:email});
    try {
        if(userDetails.length>0){
            return res.send("Email is already registered")
        }else{
            bcrypt.hash(password, 6, async(err, hash)=>{
                const user = new UserModel({
                    name,
                    email,
                    password:hash,
                    pro_pic
                })

                await user.save()
                res.send("User registered")
            });
        }
    } catch (error) {
        console.log(error);
        res.send("Error while Registering user")
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const userDetails = await UserModel.find({email:email});
    console.log(userDetails)
    try {
        if(userDetails.length>0){
            bcrypt.compare(password, userDetails[0].password, (err, result)=>{
                if(result){
                    const token = jwt.sign({ email: userDetails[0].email,name:userDetails[0].name,_id:userDetails[0]._id }, 'whatsapp');

                    res.send({
                        message:"Login Successful",
                        token: token
                    })
                }else{
                    console.log(err);
                    res.send("Something went wrong at comparing password")
                }
            });
        }
        else{
            res.send("You have to register First")
        }
    } catch (error) {
        console.log(error);
        res.send("Error while login user")
    }
})

module.exports = {
    userRouter
}