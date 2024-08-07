const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:String,
        required:true,
    },
    residentialAddress:{
        type:String,
        required:true,
    },
    permanentAddress: {
        type:String,
        required:true,
    },
    uploadedDocuments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Document"
        }
    ],
})


module.exports = mongoose.model("User", userSchema)