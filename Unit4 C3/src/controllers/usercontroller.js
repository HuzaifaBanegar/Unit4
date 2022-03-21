const express = require("express");
const app = express();
const { body, validationResult } = require('express-validator');
const upload= require("../middleware/upload");
// const uploaded= require(".")

const User = require("../modal/usermodal");

app.post("/", upload.any("profilePic"),
body("firstName").not().isEmpty().withMessage("Please Enter firstName").isLength({ min: 3, max: 30 }),
body("age").not().isEmpty().withMessage("Please Enter age").custom(async(value)=>{
    if(value<1|| value>150)
    {
        throw new Error("Please Enter age between 1-150")
    }
    return true;
}),
body("email").not().isEmpty().withMessage("Please Enter email").isEmail().withMessage("Please enter a valid email").custom(async(value)=>{
    const email= await User.findOne({email:value});
    if(email)
    {
        throw new Error("Email already exists");
    }
    return true;
}), async(req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const filePaths= req.files.map((file)=>{
          return file.path;  
        })

        const user= User.create({
            firstName:req.body.firstName,
            age:req.body.age,
            email:req.body.email,
            profilePic:filePaths
        });

        res.status(200).send(user);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports= app