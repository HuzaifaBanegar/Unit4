const express= require("express");
const mongoose= require("mongoose");

const app= express();
app.use(express.json());
const connect= ()=>{
    mongoose.connect("mongodb+srv://huzaifaBanegar:huzaifa@cluster0.xpdhx.mongodb.net/fileUpdate")
}


const userController= require("./src/controllers/usercontroller");






app.use("/users", userController);


app.listen(3000, async(req, res)=>{
    try {
        await connect()
    } catch (error) {
        console.log(err)
    }
    console.log("Listening to port 3000")
})