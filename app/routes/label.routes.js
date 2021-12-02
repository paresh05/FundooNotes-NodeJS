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
  