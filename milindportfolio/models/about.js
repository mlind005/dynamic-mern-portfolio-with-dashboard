const mongoose =require("mongoose")

const aboutScema = new mongoose.Schema({
    Adesc:{
        type:String,
        default:null
    },
    Address:{
        type:String,
        default:"surat"
    },
    Email:{
        type:String,
        default:""
    },
    Phone:{
        type:Number,
        default:""
    },
    Aboutpic:{
        type:String,
        default:""
    },
    
})
const About = mongoose.model('about',aboutScema);

module.exports = About;