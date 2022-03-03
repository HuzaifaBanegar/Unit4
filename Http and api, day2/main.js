const express= require("express");
const app= express();
// console.log(app);
app.get("/home", function(req, res){
    res.send("Hello")
});

app.get("/books", function(req, res){
    res.send({Book1:"Rich Dad Poor Dad", Book2:"Ikigai",Book3:"Think Like a Monk", Book4:"Man's Search For meaning"})
});
app.listen(5000,()=>{
    console.log("Listening to path 6000")
});