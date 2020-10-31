const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const Schema = mongoose.Schema

// create user schema
const UserModel = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name : {
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required : true
    },
})

// set password method
UserModel.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password,10)
}


// get password method
UserModel.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

// generate token 
UserModel.methods.generateJWT = function(){
    return(
        jsonwebtoken.sign({
            username : this.username
        },process.env.SECRET_KEY)
    )
}

// fetch authenticated user
UserModel.methods.toAuthData = function(){
    return {
        user: this,
        token : this.generateJWT()
    }
}

// create model
mongoose.model('User',UserModel)