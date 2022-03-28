const User= require("../model/userModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const req = require("express/lib/request");
const res = require("express/lib/response");

const newToken=(user)=>{
    return jwt.sign({user},`${process.env.SECRET_KEY}`);
}
const register= async(req,res)=>{
    try {
        var user= await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).send("Email Already Exists");
        }
        user= await User.create(req.body);
        const token= newToken(user);

        return res.status(200).send({user, token})
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const login= async(req, res)=>{
    try {
        var user= await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).send("Incorrect Email or password")
        }
        const match=user.checkPassword(req.body.password);
        if(!match)
        {
            return res.status(400).send("Incorrect Email or password")
        }
        const token= newToken(user);

        return res.status(200).send({user, token}) 
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}
module.exports={register, login}