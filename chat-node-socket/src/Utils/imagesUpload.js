
const path = require("path");
const multer = require("multer");

// images uploaded local useing multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
   // console.log("file.originalname0",file.originalname)
    const extension = path.extname(file.originalname);
   cb(null, Date.now() + extension);
    
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file,cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
        cb(null,true)
    } else {
      cb("you can only upload images jpg,png,jpeg format");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;