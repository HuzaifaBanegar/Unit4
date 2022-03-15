const express = require("express");
const mongoose = require("mongoose");
const app = express();


const transporter= require("./src/mail")

app.use(express.json())
const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/pagination");
}

// createing schema:
const userSchema = new mongoose.Schema({
    first_name: { type:String, require:true },
    gender: { type:String, require:true },
    email: { type:String, require:true },
},
    {
        versionKey: false,
        timestamp: true
    })

const User = mongoose.model("user", userSchema);


app.get("/users", async (req, res) => {
    try {
        const userData = await User.find({}).lean().exec();
        return res.status(200).send(userData)
    } catch (error) {
        console.log(error)
    }
})




app.post("/users", async(req, res)=>{
    try {
         const userpost= await User.create(req.body);
           // send mail with defined transport object
           transporter.sendMail({
            from: '"abcsystem" <abc@system.com>', // sender address
            to: `${userpost.email}`, // list of receivers
            subject:`Welcome to ABC system ${userpost.first_name} `, // Subject line
            text: `Hi ${userpost.first_name}, Please confirm your email address`, // plain text body
            
          });

        res.status(200).send(userpost)
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, async () => {
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 3000")
})