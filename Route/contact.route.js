const express = require("express");
const { authenticate } = require("../Middleware/user.authenticate");
const { UserModel } = require("../Model/user.model");
const contactRouter = express.Router();

contactRouter.post("/addContact/:id",authenticate,async(req,res)=>{
   
const id = req.params.id;
const userDetails = await UserModel.find({email:req.body.email});
// console.log(userDetails)
let findId = await UserModel.find({contact:{_id:id}})

try {
    if(findId.length>0){
        res.send("Contact is Already Saved")
    }else{
        let addContact = await UserModel.findByIdAndUpdate({_id:userDetails[0]._id},{$push:{contact:{_id:id}}})
        console.log(addContact)
        res.send("Contact Saved")
    }
} catch (error) {
    console.log(error);
    res.send("Error while adding contact route")
}

})

contactRouter.get("/getContactOfParticularUser",authenticate,async(req,res)=>{
    const data = await UserModel.find({email:req.body.email}).populate("contact").exec();
    res.send(data)
})

contactRouter.patch("/deleteContact/:id",authenticate,async(req,res)=>{
    const id = req.params.id;
    const userDetails = await UserModel.find({email:req.body.email});

    try {
        const deleteData = await UserModel.updateOne({_id:userDetails[0]._id},{$pull:{contact:{_id:id}}})
        res.send("Contact Deleted")
    } catch (error) {
        console.log(error);
        res.send("Error while deleting contact")
    }
})

module.exports = {
    contactRouter
}