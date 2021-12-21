const mongoose = require("mongoose");

const DB="mongodb+srv://manjit:garade@cluster0.ytuod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDatabase = () =>{
    mongoose.connect(DB,{
        useNewUrlParser:true,useUnifiedTopology:true
        }).then(()=>{
            console.log("server connected");
        }).catch((err)=>{
            console.log("server not connected");
        })
}

module.exports = connectDatabase