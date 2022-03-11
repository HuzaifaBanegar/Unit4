const express= require("express");
const mongoose= require("mongoose");
const app= express();

//5. BATCH SCHEMA:
const batchSchema = new mongoose.Schema({
    batch_name: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
})

//5. BATCH MODEL:
const Batch = mongoose.model("batch", batchSchema);
module.exports= Batch