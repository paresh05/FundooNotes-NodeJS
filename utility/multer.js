/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : stores the image in the upload folder
 * @file            : multer.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

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
