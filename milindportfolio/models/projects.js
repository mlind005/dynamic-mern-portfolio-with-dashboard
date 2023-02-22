const mongoose =require("mongoose")

const ProjectScema = new mongoose.Schema({
    title:{
        type:String,
        default:null
    },
    desc:{
        type:String,
        default:null
    },
    type:{
        type:String,
        default:null
    },
    Projimage:{
        type:String,
        default:null
    },
    link:{
        type:String,
        default:null
    },
    
})



const Projects = mongoose.model('projects',ProjectScema);

module.exports = Projects;