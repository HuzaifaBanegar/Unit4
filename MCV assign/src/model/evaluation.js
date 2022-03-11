const express= require("express");
const mongoose= require("mongoose");
const app= express();

const evalSchema = new mongoose.Schema({
    date: { type: String, required: true },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: true
    }
})

//6: EVALUATION MODEL:
const Evaluation = mongoose.model("evaluation", evalSchema)

module.exports= Evaluation