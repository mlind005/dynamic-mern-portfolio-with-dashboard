const mongoose = require('mongoose');



const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    accesstoken: {
        type: String,
        default:null
    },
    home:{
        name:{
            type:String,
        },
        title:{
            type:String,
        },
        subtitle:{
            type:String,
        },
        facebook:{
            type:String,
        },
        instagram:{
            type:String,
        },
        linkedin:{
            type:String,
        },
        github:{
            type:String,
        },
        twitter:{
            type:String,
        },
        homepic:{
            type:String,
        },
    },
    

})



const User = mongoose.model('admins', userScema);

module.exports = User;