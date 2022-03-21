const mongoose= require("momgoose");

const publicationSchema= new mongoose.Schema({
    name: {type:String, required:true },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamp:true,
    versionKey:false
})

const Publication= mongoose.modal("publication", publicationSchema);
module.exports= Publication