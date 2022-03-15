const mongoose=  require("mongoose");

const connect= ()=>{
    return mongoose.connect("mongodb+srv://huzaifaBanegar:huzaifa@cluster0.xpdhx.mongodb.net/verification");
}

module.exports = connect;