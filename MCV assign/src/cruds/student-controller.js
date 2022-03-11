const express= require("express");
const Student = require("../model/students")
const app= express();

//STUDENTS CRUD:
//3a. GET:
app.get("/", async (req, res) => {

    try {
        const stud = await Student.find({}).populate({ path: "userId", select: { first_name: 1, second_name: 1, gender: 1, dob: 1 } }).populate({ path: "batchId", select: "batch_name" }).lean().exec();

        res.status(200).send(stud)
    } catch (error) {
        console.log(error);
    }
})

// 3b: POST:
app.post("/", async (req, res) => {

    try {
        const stud = await Student.create(req.body);

        res.status(200).send(stud)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app;