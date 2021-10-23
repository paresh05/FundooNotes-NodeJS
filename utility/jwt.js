require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.tokenGeneration = (email) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

exports.tokenVerification = (token, callback) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
