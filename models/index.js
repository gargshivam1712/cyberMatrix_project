const mongoose = require('mongoose')

// connect database to server
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true},(error)=>{
    if(error)
    {
        console.log("Error connecting to database "+error)
    }
    else{
        console.log("CyberMatrix database Successfully connected",)
    }
})

// create user table
const User = require('./userModel')