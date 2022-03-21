const path= require("path");

const multer= require("multer");
// const uploaded= require("../")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploadedFile"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' +file.originalname)
    }
  })

  function fileFilter (req, file, cb) {
      if(file.mimetype=="image/jpeg"|| file.mimetype=="image/png")
      {
          cb(null, true);
      }
      else
      {
          cb(new Error("File needs to be jpeg or png"), false)
      }
  
  }

  const options={
      storage,
      fileFilter,
      limits:{
        fileSize:  1024 * 1024 * 5
      }
  }
  
  const upload = multer(options);

  module.exports= upload