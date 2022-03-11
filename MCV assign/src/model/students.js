const express= require("express");
const mongoose= require("mongoose");
const app= express();

const studentSchema = new mongoose.Schema({
    rollno: { type: String, required: true },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

//3. STUDENTS MODEL:
const Student = mongoose.model("student", studentSchema);

module.exports= Student