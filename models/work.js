const mongoose =require("mongoose")

const WorkSchema = new mongoose.Schema({
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




const Work = mongoose.model('work',WorkSchema);

module.exports = Work;