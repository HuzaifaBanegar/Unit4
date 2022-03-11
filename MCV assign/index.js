const express = require("express");
const mongoose = require("mongoose");

const connectDb= require("./src/config/setup")

const User= require("./src/model/user") ;
const Teacher= require("./src/model/teacher")
const Student= require("./src/model/students")
const Admin= require("./src/model/admin");
const Batch= require("./src/model/batch");
const Evaluation= require("./src/model/evaluation");
const Submission= require("./src/model/submissions");


const usersController= require("./src/cruds/user-controller")
const teacherController= require("./src/cruds/teacher-controller")
const studController= require("./src/cruds/student-controller")
const batchController= require("./src/cruds/batch-controller")
const adminController= require("./src/cruds/admin-controller")
const evalController= require("./src/cruds/eval-controller")
const submitController= require("./src/cruds/submit-controller")



const app = express();

app.use(express.json())

app.use("/users",usersController )
app.use("/students",studController)
app.use("/teachers", teacherController);
app.use("/admins", adminController);
app.use("/batches", batchController);
app.use("/evaluations", evalController)
app.use("/submissions", submitController)

//*********************************************** SERVER *********************************************
app.listen(7100, async () => {
    try {
        await connectDb();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 7100");
})