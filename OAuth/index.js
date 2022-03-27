const mongoose=require("mongoose");
const express= require("express");
const app= express();
const {register, login, newToken}= require("./src/controllers/authController")

app.use(express.json());

const connect=()=>{
    mongoose.connect("mongodb+srv://huzaifabanegar:huzaifa@cluster0.15dzv.mongodb.net/OAuth")
}
const passport= require("./src/config/oauthconfig")

const prodController= require("./src/controllers/prodController");


app.use("/products", prodController);

app.post("/register", register);

app.post("/login", login);

// app.post("/products", products);


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' , session:false}),
  function(req, res) {
    const token= newToken(req.user);
    return res.status(200).send({user:req.user, token})
  });


app.listen(5000, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error)
    }
    console.log("Listening to port 5000");
})