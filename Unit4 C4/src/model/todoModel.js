const mongoose= require("mongoose");

const todoSchema=new mongoose.Schema({
    title:{type:String},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
});


const Todos= mongoose.model("todo", todoSchema);

module.exports= Todos;