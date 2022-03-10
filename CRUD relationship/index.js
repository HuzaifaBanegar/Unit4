const express = require('express');
const mongoose = require("mongoose");
const app= express();

app.use(express.json());

//connect MongoDb
const connect= ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/relationship");
}

//Create Schema for Section
const sectionSchema = new mongoose.Schema({
    genre:{type:String, required:true},
},
{
    versionKey:false,
    timestamp: true,
}
);
//Create Model

const Section= mongoose.model("section", sectionSchema)
//Create Schema for Books
const bookSchema= new mongoose.Schema({
    name:{ type:String, required:true},
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
      },

})
//create model for books
const Book= mongoose.model("book", bookSchema);

//create Schema for Authors:
const authorSchema= new mongoose.Schema({
    first_name:{type:String, required:true},
    second_name:{ type:String, required:false},
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true,
    }
})
//model for author:
const Author= mongoose.model("author", authorSchema);


//************************************************************* CRUD SECTION ****************************************************************

//GET:=================================================================================================================

app.get("/section", async(req, res)=>{
    try {
        const sectionData= await Section.find({}).lean().exec();
        // console.log(sectionData);
        res.status(200).send(sectionData)
    } catch (error) {
        console.log(error);
    }
    
});

app.get("/books", async(req, res)=>{
    try{
    const findgenrebyBooks= await Book.find({}).populate({path:"sectionId", select:"genre"}).lean().exec();
    res.status(200).send(findgenrebyBooks);
    }catch(error){
        console.log(error)
    }
});


// Getting Books in a section:
app.get("/books/:id", async(req, res)=>{
    try {
        // console.log(req.params.id)
        const bookbyid= await Book.find({sectionId:req.params.id}).lean().exec();

        res.send(bookbyid);
    } catch (error) {
        console.log(error)
    }
})


// Getting all the books by Author:
app.get("/authors", async(req, res)=>{
    try {
        const authorssData= await Author.find({}).populate({path:"bookId", select:"name", populate:{path:"sectionId", select:"genre"}}).lean().exec();
        // console.log(sectionData);
        res.status(200).send(authorssData)
    } catch (error) {
        console.log(error);
    }
    
});


//POST:========================================================================================================================


app.post("/section", async(req, res)=>{
    try {
        const sec= await Section.create(req.body);

        res.status(200).send(sec)
    } catch (error) {
        console.log(error)
    }
})

app.post("/books", async(req, res)=>{
    try {
        const bk= await Book.create(req.body);

        res.status(200).send(bk)
    } catch (error) {
        console.log(error)
    }
})

app.post("/authors", async(req, res)=>{
    try {
        const aut= await Author.create(req.body);

        res.status(200).send(aut)
    } catch (error) {
        console.log(error)
    }
})

//PATCH==========================================================================================================================

app.patch("/books/:id", async(req, res)=>{
    try {
        // console.log(req);
        const bookupdate= await Book.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec();

        res.status(201).send(bookupdate)

    } catch (error) {
        console.log(error);
    }
})

app.patch("/sections/:id", async(req, res)=>{
    try {
        const sectionupdate= await Section.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec();

        res.status(201).send(sectionupdate)
    } catch (error) {
        console.log(error)
    }
})

app.patch("/authors/:id", async(req, res)=>{
    try {
        const authupdate= await Author.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec();

        res.status(201).send(authupdate)
    } catch (error) {
        console.log(error)
    }
})

//DELETE:======================================================================================================================

app.delete("/books/:id", async(req, res)=>{
    try {
        const deletebook= await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(deletebook)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/sections/:id", async(req, res)=>{
    try {
        const deletesection= await Section.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(deletesection)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/authors/:id", async(req, res)=>{
    try {
        const deleteauth= await Author.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(deleteauth)
    } catch (error) {
        console.log(error)
    }
})


//PORT:==========================================================================================================================================

app.listen(9000, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log(error);
    }
    console.log("Listening to port 9000")
});
