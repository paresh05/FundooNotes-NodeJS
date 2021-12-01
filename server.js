const { verifyToken } = require("./app/middleware/note.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const dbConfig = require("./config/dbConnect.js");
const cors = require("cors")
const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();
const storage = multer.diskStorage({
  destination: "./uploads/images/",
  filename:(req,file,callback)=>{
    callback(
      null,
      file.fieldname+"-"+Date.now()+ path.extname(file.originalname) 
    );
  },
});
const upload = multer({
  storage: storage,
}).single("image");
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.post("/upload-image",verifyToken,(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      res.status(400).send(err);
    } else {
      res.status(200).send(req.file);
    }
  })
})
app.use(express.static("uploads"));
app.use(express.json());
require("./app/routes/note.routes.js")(app);
require("./app/routes/user.routes.js")(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// listen for requests
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
  dbConfig();
});
