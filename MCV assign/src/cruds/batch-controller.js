const express= require("express");
const Batch = require("../model/batch")
const app= express();

//4. BATCH CRUD
//4a. GET:
app.get("/", async (req, res) => {

    try {
        const btch = await Batch.find({}).lean().exec();

        res.status(200).send(btch)
    } catch (error) {
        console.log(error);
    }
})

app.post("/", async (req, res) => {

    try {
        const btch = await Batch.create(req.body);

        res.status(200).send(btch)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app