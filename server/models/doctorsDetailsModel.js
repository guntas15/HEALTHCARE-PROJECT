const mongoose = require("mongoose");
const DoctorSchema = mongoose.Schema({
    DoctorName:{
        type : String , 
        require : [ true , "please add your name"],
    },
    Speciality:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    experience:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    phonenumber:{
        type : Number , 
        require : [ true , "please add your phone number"],
    },
    address:{
        type : String , 
        require : [ true , "please add your age"],
    },
    email:{
        type: String,
        require : [ true , "please add your age"],
    }
    
},
{
    timestamps : true ,
});
module.exports = mongoose.model("Doctor" , DoctorSchema);