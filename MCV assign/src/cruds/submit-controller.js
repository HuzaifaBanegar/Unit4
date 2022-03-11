const express= require("express");
const Submission = require("../model/submissions")
const app= express();

//7.SUBMISSION CRUD:

// 7a. GET:
app.get("/", async (req, res) => {
    try {
        const submit = await Submission.find({}).populate({ path: "evalId", select: "date" }).populate({ path: "studId", select: "rollno" , populate:{path:"userId", select:["first_name", "last_name"]}}).lean().exec();

        res.status(200).send(submit)
    } catch (error) {
        console.log(error)
    }
})


//++++++++++++++++++======================QUERY: FIND ALL THE STUDENT THAT HAD GIVEN PERTUCULAR EVALUATION================+++++++++++++++++++++++++++++++++++++++


app.get("/:id", async (req, res) => {
    try {
        const submit = await Submission.find({evalId:req.params.id}).populate({ path: "studId", select: "rollno" , populate:{path:"userId", select:["first_name", "last_name"]}}).sort({"marks":-1}).limit(1).lean().exec();

        res.status(200).send(submit)
    } catch (error) {
        console.log(error)
    }
})

//+++++++++++++++++++======================QUERY: FIND GRETEST MARKS IN EVALUATION BY STUDENT==============================++++++++++++++++++++++++++++++++++++++

app.get("/:id", async (req, res) => {
    try {
        const submit = await Submission.find({evalId:req.params.id}).populate({ path: "studId", select: "rollno" , populate:{path:"userId", select:["first_name", "last_name"]}}).lean().exec();

        res.status(200).send(submit)
    } catch (error) {
        console.log(error)
    }
})


//7b. POST:
app.post("/", async (req, res) => {

    try {
        const submit = await Submission.create(req.body);

        res.status(200).send(submit)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app