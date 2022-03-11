const express= require("express");
const mongoose= require("mongoose");
const app= express();

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

//2. TEACHER MODEL:
const Teacher = mongoose.model("teacher", teacherSchema);
module.exports= Teacher;