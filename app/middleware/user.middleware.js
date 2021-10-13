const logger = require("../../logger");
module.exports = (req, res, next) => {
  if (!req.body.firstName) {
    logger.error("First Name can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "First Name can not be empty (handled by middleware)",
    });
  } else if (!req.body.lastName) {
    logger.error("Last Name can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "Last Name can not be empty (handled by middleware)",
    });
  } else if (!req.body.email) {
    logger.error("Email can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "Email can not be empty (handled by middleware)",
    });
  } else if (!req.body.mobileNumber) {
    logger.error("Mobile Number can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "Mobile Number can not be empty (handled by middleware)",
    });
  }
  var firstNamePattern = new RegExp("^[A-Z]{1}[a-z]{2,}$");
  var lastNamePattern = new RegExp("^[A-Z]{1}[a-z]{2,}$");
  var emailNamePattern = new RegExp(
    "[a-z0-9]+((\\.)[a-z0-9]+)?@[a-z0-9]+(\\.)co(\\.)*[a-z]+$"
  );
  var mobileNumberPattern = new RegExp("^[0-9]{2} [0-9]{10}$");
  if (!firstNamePattern.test(req.body.firstName)) {
    logger.error("Not a valid first name");
    return res.status(400).send({
      message: "Not a valid first name",
    });
  } else if (!lastNamePattern.test(req.body.lastName)) {
    logger.error("Not a valid last name");
    return res.status(400).send({
      message: "Not a valid last name",
    });
  } else if (!emailNamePattern.test(req.body.email)) {
    logger.error("Not a valid email");
    return res.status(400).send({
      message: "Not a valid email",
    });
  } else if (!mobileNumberPattern.test(req.body.mobileNumber)) {
    logger.error("Not a valid mobile number");
    return res.status(400).send({
      message: "Not a valid mobile number",
    });
  } else {
    next();
  }
};