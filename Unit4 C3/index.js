const mongoose= require("mongoose");
const express= require("express");
app= express();
app.use(express.json());

const connect= ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/BookSystem");
}

const userController= require("./src/controllers/usercontroller");

app.use("/users", userController)


app.listen(5000, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 5000")
})