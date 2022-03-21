const mongoose= require("mongoose");

bookSchema= new mongoose.Schema({
    like:{type:Number,required:true, default:0},
    coverImage:{type:String, required:true},
    content:{type:String, required:true },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

},{
    timestamps:true,
  versionKey:false  
})

const Books= mongoose.model("book", bookSchema);

module.exports= Books;