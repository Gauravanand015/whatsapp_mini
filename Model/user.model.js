const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:{type:String,Unique:true},
    password:String,
    pro_pic:String,
    contact : [{type:mongoose.Schema.ObjectId,ref:"user"}]
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}