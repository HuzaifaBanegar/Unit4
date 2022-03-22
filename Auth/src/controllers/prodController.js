const express= require("express");
const { append } = require("express/lib/response");

const authenticate= require("../middleware/authenticate");
const authorise = require("../middleware/authorise");

const Products= require("../modules/prodmodules")

const router= express.Router();

router.post("/",authenticate, async(req, res)=>{
    // req.userId= req.user._id;
   req.body.userId= req.user._id
    try {
        const products= await Products.create(req.body)

        res.status(200).send(products)
    } catch (error) {
        res.status(500).send("error:",error.message)
    }
})


router.get("/",authenticate, async(req, res)=>{
    try {
        const products= await Products.find().lean().exec();

        res.status(200).send(products)
    } catch (error) {
        res.status(500).send("error:",error.message)
    }
})

router.patch("/:id",authenticate,authorise(["seller", "admin"]), async(req, res)=>{
    try {
        const products= await Products.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec();

        res.status(200).send(products)
    } catch (error) {
        res.status(500).send("error:",error.message)
    }
})

router.delete("/:id", authenticate,authorise(["seller", "admin"]), async(req, res)=>{
    try {
        const products = await Products.findByIdAndDelete(req.params.id).lean().exec(); 

        res.status(200).send(products)
    } catch (error) {
        
    }
    res.status(500).send("error:",error.message)

})

module.exports= router;
