const express= require("express");

const Todos= require("../model/todoModel");
const authenticate = require("../middleware/authenticate")
const authorise= require("../middleware/authorize")
const app= express();

app.post("/",authenticate, async(req, res)=>{
    try {
        const todos= await Todos.create(req.body);

        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});
app.get("/",authenticate, async(req, res)=>{
    try {
        const todos= await Todos.find().populate("userId").lean().exec();

        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

app.patch(":/id",authenticate,authorise(`${req.params.id}`), async(req, res)=>{
    try {
        const todos= await Todos.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec();

        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

app.delete("/:id",authenticate, authorise(`${req.params.id}`), async(req, res)=>{
    try {
        const todos= await Todos.findByIdAndDelete(req.params.id).lean().exec();

        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

module.exports= app;