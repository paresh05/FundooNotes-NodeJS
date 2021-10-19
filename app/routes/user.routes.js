module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const {
    validateWithJoi,
    validate,
  } = require("../middleware/user.middleware.js");
  // Create a new Note
  app.post("/users", validateWithJoi, users.create);

  // Retrieve all Notes
  app.get("/users", users.findAll);

  // Retrieve a single Note with noteId
  app.get("/users/:userId", users.findOne);

  // Update a Note with noteId
  app.put("/users/:userId", validateWithJoi, users.update);

  // Delete a Note with noteId
  app.delete("/users/:userId", users.delete);

  app.post("/login", users.loginUser);
};
