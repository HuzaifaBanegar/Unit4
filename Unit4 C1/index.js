const express= require("express");
const app= express();

app.use(logger);

app.get("/books", function (req, res){
    res.send({route:"/books"})
})
app.get("/libraries",checkPermission("librarian"), function (req, res){
    res.send({route:"/libraries"})
})
app.get("/authors",checkPermission("authors"), function (req, res){
    res.send({route:"/authors"})
})

function logger(req, res, next){
    console.log("I am Middleware");
    next();
}

function checkPermission(position)
{
    return function logger1(req, res, next){
        if(position=="librarian" && req.url=="/libraries")
        {
            console.log("Permission:true for librarian");
            next();
        }
        if(position=="authors" && req.url=="/authors")
        {
            console.log("Permission: true for Authors");
            next();
        }
        else{
            res.send("Permission: false")
        }
    }
}

app.listen(7000, ()=>{
    console.log("Listening to port 7000")
})