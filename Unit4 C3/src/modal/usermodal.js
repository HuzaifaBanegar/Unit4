const { default: mongoose } = require("mongoose");
const mogoose= require("mongoose");

const userSchema= new mongoose.Schema({
    firstName:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true},
    profilePic:[{type:String, required:true}],

},{
    timestamps:true,
    versionKey:false
});


const User= mongoose.model("user", userSchema);
module.exports= User