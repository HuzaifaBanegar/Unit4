const User = require("../modals/usermodule")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const newToken=(user)=>{
    // console.log(process.env.SECRET_KEY)
    return jwt.sign({user}, `${process.env.SECRET_KEY}`);
}

const register = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ error: "Email Already Exists" })
        }
        user = await User.create(req.body);
        const token= newToken(user);
        // console.log(token)

        return res.status(200).send({user, token})
    } catch (error) {
        return res.send("error:" + error.message)
    }
}

const login = async(req, res) => {
    try {
        var user= await User.findOne({email: req.body.email})
        if(!user)
        {
            return res.status(501).send("Incorrect Email or password")
        }
        const match= user.checkPassword(req.body.password);
        if(!match)
        {
            return res.status(500).send("Incorrect Email or password")
        }
        const token= newToken(user);
        return res.status(200).send({user, token})

    } catch (error) {
        return res.send("error:" + error.message)
    }
}

module.exports = { register, login, newToken };