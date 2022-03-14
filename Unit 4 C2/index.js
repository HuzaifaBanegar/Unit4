const express= require("express");
const mongoose= require("mongoose");

const app= express();
app.use(express.json());

const connectDb= ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/banking")
}

//USer Schema:
const userSchema= new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    gender:{type:String, required:false},
    type:{type:String, default:"customer"},
},{
    timestamps:true,
    versionKey:false,
})

//User Model:
const User= mongoose.model("user", userSchema);

//Branch Schema:
const branchSchema= new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    IFSC:{type:String, required:true},
    MICR:{type:Number, required:true},
},{
    timestamps:true,
    versionKey:false
})

//Branch Model:
const Branch= mongoose.model("branch", branchSchema);


//Master Model
const masterSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    relationId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"branch"
    },
    balance:{type:Number, required:true},
},{
    timestamps:true,
    versionKey:false,
})
//Master model
const Master= mongoose.model("master", masterSchema);

// saving Schema:

const savingSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
        unique:false,
    },
    accountNumber:{type:Number, required:true, unique:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"master"
    },
    interestRate:{type:Number, required:true},

},{
    timestamps:true,
    versionKey:false,
})

//Saving model:
const Saving= mongoose.model("saving", savingSchema)

//fixed Schema:
const fixedSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
        unique:false,
    },
    accountNumber:{type:Number, required:true, unique:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"master"
    },
    interestRate:{type:Number, required:true},
    startDate:{type:String, required:true},
    maturityDate:{type:String, required:true},
},{
    timestamps:true,
    versionKey:false,
})
//fixed model
const Fixed= mongoose.model("fixed", fixedSchema)

//CRUDS:
// .populate({path:"userId", select:'firstName lastNameage email address gender'})
// 1. GET API to get all the details of the master account ( here you will get the complete detail of the master account collection along with the full user detail )
app.get("/user", async(req, res)=>{
    try {
        const user= await User.find({}).lean().exec();

        res.status(200).send(user);
    } catch (error) {
        console.log(error)
    }
})
app.post("/user", async(req, res)=>{
    try {
        const userData= await User.create(req.body);

        res.status(200).send(userData);
    } catch (error) {
        console.log(error)
    }
})

app.get("/branch", async(req, res)=>{
    try {
        const branch= await Branch.find({}).lean().exec();

        res.status(200).send(branch);
    } catch (error) {
        console.log(error)
    }
})



app.post("/branch", async(req, res)=>{
    try {
        const Data= await Branch.create(req.body);

        res.status(200).send(Data);
    } catch (error) {
        console.log(error)
    }
})

app.post("/master", async(req, res)=>{
    try {
        const Data= await Master.create(req.body);

        res.status(200).send(Data);
    } catch (error) {
        console.log(error)
    }
})

app.get("/master", async(req, res)=>{
    try {
        const branch= await Master.find({}).populate({path:"userId", select:'firstName lastNameage email address gender'}).populate({path:"relationId", select:'firstName lastNameage email address gender'}).populate({path:"branchId", select:'name address IFSC MICR'}).lean().exec();

        res.status(200).send(branch);
    } catch (error) {
        console.log(error)
    }
})
//2. POST API for the user to create a SavingsAccount
app.post("/saving", async(req, res)=>{
    try {
        const Data= await Saving.create(req.body);

        res.status(200).send(Data);
    } catch (error) {
        console.log(error)
    }
})


//3. POST API for the user to create a FixedAccount

app.post("/fixed", async(req, res)=>{
    try {
        const Data= await Fixed.create(req.body);

        res.status(200).send(Data);
    } catch (error) {
        console.log(error)
    }
})


app.listen(4000, async()=>{
    try {
        await connectDb();
    } catch (error) {
        console.log(error);
    }
    console.log("Listeing to port 4000")

})