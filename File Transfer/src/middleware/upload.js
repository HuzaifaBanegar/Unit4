const path= require("path")

const multer  = require('multer')
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploadedFolder"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })

  function fileFilter (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if(file.mimetype== "image/jpeg" || file.mimetype == "image/png")
    {
        cb(null, true)
    }
    else{
        cb(new Error('File required is JPEG/PNG'), false)
    }
  };

const options={
    storage,
    fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
}
const upload = multer(options)

module.exports= upload;

