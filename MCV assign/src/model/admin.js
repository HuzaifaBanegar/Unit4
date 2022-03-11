const express= require("express");
const mongoose= require("mongoose");
const app= express();

// 4: ADMIN SCHEMA:
const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

//4. ADMIN MODEL:
const Admin = mongoose.model("admin", adminSchema);
module.exports= Admin