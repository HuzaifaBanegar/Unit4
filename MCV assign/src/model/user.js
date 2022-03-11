const express= require("express");
const mongoose= require("mongoose");
const app= express();


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    gender: { type: String, required: true },
    d0b: { type: String, required: true },
    type: { type: String, required: true }
},
    {
        timestamps: true,
        versionKey: false,
    })

//1. USER MODEL:
const User = mongoose.model("user", userSchema)

module.exports= User