const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// user database 
const UserModel = mongoose.model('User')


// fetch all users
route.get('/',async(req,res)=>{
    UserModel.find()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>
        {
            res.status(400).json({"message" :" Server Error"})
        })
})


// for sign up
route.post('/',async(req,res)=>{
    const data = req.body
    UserModel.findOne({$or:[{username:data.username},{email:data.email}]},(err,raw)=>{
        if(raw)
        {  
            res.status(400).json({"error":"User already exist"})
        }
        else{
            const user = new UserModel({username:data.username,name:data.name,email:data.email})
            user.setPassword(data.password)
            user.save().then(data=>{
                res.json({"token":data.generateJWT(),"message":"Register Successfully"})})
                // server problem or database problem
                .catch(err=>{
                    res.status(400).json({"message":"Server error"})
                })
        }
    })
})


// fetch particular user by token only authenticated user can access it
route.get('/profile',async (req,res)=>{
    const token = req.headers['x-access-token']
    // check token available or not
    if(!token){res.status(401).json({"error":"Token is missing"})}
    const data = jwt.decode(token,"shivam garg")
    // check token is valid or not
    if(!data){
        res.status(401).json({"error":"token is invalid"})
    }
    else{
        UserModel.findOne({username : data.username},(err,doc)=>{
            if(!doc){
                res.status(401).json({"error":"User Not Authenticated"})
            }
            else{
                // send data to client
                res.json(doc)
            }
        })
    }
})


// for login
route.post('/login',async(req,res)=>{
    const {email,password} = req.body
    // check email registered or not
    UserModel.findOne({email},(err,data)=>{
        if(!data){
            res.status(401).json({"error":"Invalid Username or Password"})
        }
        else{
            console.log(data.checkPassword(password))
            if(data.checkPassword(password)){
                res.json({"token":data.generateJWT()})
            }
            else{
                res.status(401).json({"error":"Invalid Username or Password"})
            }
        }
    })
})

module.exports = route