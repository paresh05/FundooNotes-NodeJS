const logger = require("../../logger");
const jwtUtil = require("../../utility/jwt");
const validation = (req, res, next) => {
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
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.send("Token is empty");
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  jwtUtil.tokenVerification(token, (err, data) => {
    if (err) {
      res.send(err);
    }
    next();
  });
};
module.exports = {
  validation,
  verifyToken,
};
