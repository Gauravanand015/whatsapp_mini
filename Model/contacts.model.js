const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id :{type:mongoose.Schema.ObjectId,ref:"user"}
})

const ContactModel = mongoose.model("contact",contactSchema);

module.exports = {
    ContactModel
}