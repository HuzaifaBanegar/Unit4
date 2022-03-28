const express= require("express");

const User= require("../model/userModel");
const authorise=(permittedPerson)=>{
    return (req, res, next)=>{
        const user= req.user;
        let isPermitted= false;
        if(user._id=== permittedPerson)
        {
            isPermitted=true;
        }
        if(isPermitted){
            return next();
        }
        return res.status(401).send("Unauthorized to make changes")
    }
}

module.exports= authorise;