mongoose = require("mongoose")


const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
   console.log("connect success")
}).catch((err)=>{
   console.log("not success")
})  