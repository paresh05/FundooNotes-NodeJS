/**
 * @requires nodemailer
 * @requires dotenv
 */
var nodemailer = require("nodemailer");
require("dotenv");
/**
 * @description This function is used send an email when user logs in
 */
const createEmail = () => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  var mailOptions = {
    from: process.env.email,
    to: "pareshpraveen99@gmail.com",
    subject: "Sending Email using Node.js for Successfull Login",
    text: "Congratulations!! You have LOGGED IN Successfully!! Enjoy Coding",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
/**
 * @description This function sends token in email for forgot password
 * @param {string} email
 * @param {string} token
 */
const forgotPasswordEmail = (email, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  var mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Reset Password",
    text: "Token: " + token,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  createEmail,
  forgotPasswordEmail,
};
