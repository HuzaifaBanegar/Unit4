const express= require("express");
const Teacher = require("../model/teacher")
const app= express();


//TEACHERS CRUD

//2a. GET:
app.get("/", async (req, res) => {

    try {
        const teach = await Teacher.find({}).populate({ path: "userId", select: { first_name: 1, second_name: 1, gender: 1, dob: 1 } }).lean().exec();

        res.status(200).send(teach)
    } catch (error) {
        console.log(error);
    }
})

// 2b: POST:
app.post("/", async (req, res) => {

    try {
        const teach = await Teacher.create(req.body);

        res.status(200).send(teach)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app