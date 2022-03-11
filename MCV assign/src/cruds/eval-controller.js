const express= require("express");
const Evaluation = require("../model/evaluation")
const app= express();

// /6.EVALUATION CRUD:

//6a.GET:
app.get("/", async (req, res) => {

    try {
        const eval = await Evaluation.find({}).populate({ path: "batchId", select: "batch_name" }).populate({ path: "teacherId", populate: { path: "userId", select: { first_name: 1, second_name: 1, gender: 1, dob: 1 } } }).lean().exec();

        res.status(200).send(eval)
    } catch (error) {
        console.log(error);
    }
})

// 6b. POST:
app.post("/", async (req, res) => {

    try {
        const eval = await Evaluation.create(req.body);

        res.status(200).send(eval)
    } catch (error) {
        console.log(error);
    }
})

module.exports=app