const req = require("express/lib/request");
const jwt= require("jsonwebtoken");
require('dotenv').config();


const verifyTheToken=(token)=>{
    return new Promise((resolve, reject)=>{
        var decoded= jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(err)
            {
                return reject(err)
            };
            return resolve(decoded)
        });
    })
}

const authenticate= async(req, res, next)=>{
    if(!req.headers.authorization){
        res.status(400).send("You are not Authorised");
    }
    if(!req.headers.authorization.startsWith("Bearer "))
    {
        res.status(400).send("You are not Authorised"); 
    }
    const token = req.headers.authorization.trim().split(" ")[1];
    let decoded
    try {
        decoded = await verifyTheToken(token);
         //do something
    } catch (error) {
         res.status(401).send("Unauthorized");
    }
    req.user=decoded.user;
    next();
} 

module.exports= authenticate
