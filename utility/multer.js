const multer = require("multer");
const path = require("path");

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: "./uploads/images/",
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  return multer({
    storage: storage,
  }).single("image");
};

module.exports = uploadImage;
