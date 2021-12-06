/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : label routes for label url end points
 * @file            : label.routes.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

module.exports = (app) => {
    const label = require("../controllers/label.controller.js");
    const { labelValidation, verifyLabelToken } = require("../middleware/label.middleware");
    // Create a new Label
    app.post("/label", verifyLabelToken, labelValidation, label.create);
  
    // Retrieve all Label
    app.get("/label", verifyLabelToken, label.findAll);
  
    // Retrieve a single Label with labelId
    app.get("/label/:labelId", verifyLabelToken, label.findOne);
  
    // Update a Label with labelId
    app.put("/label/:labelId", verifyLabelToken, labelValidation, label.update);
  
    // Delete a Label with labelId
    app.delete("/label/:labelId", verifyLabelToken, label.delete);
  };
  