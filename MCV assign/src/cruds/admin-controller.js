const express= require("express");
const Admin = require("../model/admin")
const app= express();

//5. ADMIN CRUD:

//5.a. GET:
app.get("/", async (req, res) => {

    try {
        const admin = await Admin.find({}).populate({ path: "userId", select: { first_name: 1, second_name: 1, gender: 1, dob: 1 } }).lean().exec();

        res.status(200).send(admin)
    } catch (error) {
        console.log(error);
    }
})

app.post("/", async (req, res) => {

    try {
        const btch = await Admin.create(req.body);

        res.status(200).send(btch)
    } catch (error) {
        console.log(error);
    }
})

module.exports= app;