const mongoose= require("mongoose");
const express= require("express");
const app= express();
app.use(express.json());

const connect=()=>{
    mongoose.connect("mongodb+srv://huzaifabanegar:huzaifa@cluster0.15dzv.mongodb.net/Unit4C4")
}
const todoController= require("./src/controllers/todoController");

app.use("/todos", todoController);

const {register, login}= require("./src/controllers/authController")
app.post("/register", register);

app.post("/login", login);




app.listen(5000, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 5000");
})


//liabraries:
// jsonwebtoken-token;
// bcrypt-password hashing
//uuid-random string
//passport-oAuth
//passport-google-auth20-googleauth
//multer- file upload