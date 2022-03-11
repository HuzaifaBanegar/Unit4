const express= require("express");
const User = require("../model/user")

const app= express();



//1a. GET:
app.get("/", async (req, res) => {

    try {
        const user = await User.find({}).lean().exec();

        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
})

//1b. POST:
app.post("/", async (req, res) => {

    try {
        const user = await User.create(req.body);

        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app;
