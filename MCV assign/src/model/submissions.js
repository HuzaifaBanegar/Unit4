const express= require("express");
const mongoose= require("mongoose");
const app= express();

//7. SUBMISSION SCHEMA:
const submitSchema = new mongoose.Schema({
    evalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: true
    },
    studId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },
    marks: { type: Number, required: true },

}, {
    timestamps: true,
    versionKey: false
})

//7 SUBMISSION MODEL:
const Submission = mongoose.model("submission", submitSchema);

module.exports= Submission;
