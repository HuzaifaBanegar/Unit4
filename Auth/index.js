const mongoose=require("mongoose");
const express= require("express");
const app= express();
const {register, login}= require("./src/controllers/authController")

app.use(express.json());

const connect=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Authentication")
}

const prodController= require("./src/controllers/prodController");


app.use("/products", prodController);

app.post("/register", register);

app.post("/login", login);

// app.post("/products", products);


app.listen(7777, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 7777");
})