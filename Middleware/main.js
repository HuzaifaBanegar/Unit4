const express= require("express");
// console.log(express)
const app= express();

app.use(fetching);
function fetching(req, res, next){
    console.log("Fetching All Books");
    next();
}


app.get(`/books/:name`, singleBook, function(req, res){
    return res.send({"bookName": req.name})
});



function singleBook(req, res, next)
{
        req.name= req.params.name;
        if("GameOfThrones" == req.name||"HarryPotter" == req.name)
        {
            next();
        }
        else
        {
            return res.send("Book Not Found")
        }
}


app.listen(8000, function(){
    console.log("Listening to port 8000")
})