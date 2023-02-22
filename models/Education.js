const mongoose =require("mongoose")

const EducationSchema = new mongoose.Schema({
    time:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:null
    },
    org:{
        type:String,
        default:null
    },
    desc:{
        type:String,
        default:null
    },
   
    
})



const Education = mongoose.model('eductaion',EducationSchema);

module.exports = Education;