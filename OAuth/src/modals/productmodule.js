const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
},{
    timestamps:true,
    versionKey:false
})


const Products = mongoose.model("product", productSchema);

module.exports= Products;