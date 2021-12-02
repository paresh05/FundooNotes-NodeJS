const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const dbConfig = require("./config/dbConnect.js");
const cors = require("cors")
const express = require("express");
const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static("uploads"));

require("./app/routes/label.routes.js")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/user.routes.js")(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// listen for requests
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
  dbConfig();
});
