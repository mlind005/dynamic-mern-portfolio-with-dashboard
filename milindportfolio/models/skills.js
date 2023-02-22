const mongoose =require("mongoose")

const skillScema = new mongoose.Schema({
    skillname:{
        type:String,
    },
    level:{
        type:Number,
    }
})




const Skills = mongoose.model('skills',skillScema);

module.exports = Skills;