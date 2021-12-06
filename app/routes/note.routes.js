/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : note routes for note url end points
 * @file            : note.routes.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");
  const { validation, verifyToken } = require("../middleware/note.middleware");
  // Create a new Note
  app.post("/notes", verifyToken, validation, notes.create);

  // Retrieve all Notes
  app.get("/notes", verifyToken, notes.findAll);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", verifyToken, notes.findOne);

  // Update a Note with noteId
  app.put("/notes/:noteId", verifyToken, validation, notes.update);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", verifyToken, notes.delete);

  // Upload a Image
  app.post("/upload-image",verifyToken, notes.image);
};
