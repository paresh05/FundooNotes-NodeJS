const logger = require("../logger");
module.exports = (req, res, next) => {
  if (!req.body.content) {
    logger.error("Note content can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "Note content can not be empty (handled by middleware)",
    });
  }

  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    logger.error("Note a valid title name");
    return res.status(400).send({
      message: "Note a valid title name",
    });
  } else {
    next();
  }
};
