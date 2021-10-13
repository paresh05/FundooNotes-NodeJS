const dbConfig = require("./config/dbConnect.js");
const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
require("./app/routes/note.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  dbConfig();
});
