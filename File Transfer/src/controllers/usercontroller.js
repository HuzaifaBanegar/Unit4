const mongoose = require("mongoose");
const express= require("express")

const User = require("../modal/user");

const upload = require("../middleware/upload");


const app= express();

app.get("/", async (req, res) => {
    try {
        const users = await User.find().lean().exec();

        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.post('/', upload.single("profilePic"), async(req, res)=> {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        // console.log("working")
        const user = await User.create({
            firstName: req.body.firstName,
            profilePic: req.file.path,
        });
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
//------------------------------- Querry: how to update
// fs.unlink('fileToBeRemoved', function(err) {
//     if(err && err.code == 'ENOENT') {
//         // file doens't exist
//         console.info("File doesn't exist, won't remove it.");
//     } else if (err) {
//         // other errors, e.g. maybe we don't have enough permission
//         console.error("Error occurred while trying to remove file");
//     } else {
//         console.info(`removed`);
//     }
// });
app.patch("/:id", async(req, res)=>{
    try {
        const updated= await User.findByIdAndUpdate(req.params.id, req.body);
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
})
//----------------------------------

app.post("/multiple", upload.any("profilePic"), async (req, res) => {
    try {
      const filePaths = req.files.map((file) => {
        return file.path;
      });
  
      const user = await User.create({
        firstName: req.body.firstName,
        profilePic: filePaths,
      });
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  app.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).lean().exec();
      // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports= app;