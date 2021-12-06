/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : Creation of user collection and CRUD operations of user
 * @file            : user.model.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/


/**
 * @requires mongoose bcrypt jwt 
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtUtil = require("../../utility/jwt");
/**
 * @description Creates a user collection
 */
const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);
/**
 * @description This function is used to hash the password before saving the user
 */
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
/**
 * @description This function is used to create a new User
 * @param {callback} callback 
 * @returns err or user
 */
const createUser = (
  { firstName, lastName, email, password },
  callback
) => {
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  return user.save((err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
/**
 * @description This function is used to retrieve all the users
 * @param {callback} callback 
 */
const findUser = (callback) => {
  User.find((err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
/**
 * @description This function is used to retrieve a user by passing the id
 * @param {_id} findUserId 
 * @param {callback} callback 
 */
const findUsersId = (findUserId, callback) => {
  User.findById(findUserId, (err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
/**
 * @description This function finds a user that matches the email id passed
 * @param {string} emailId 
 * @param {callback} callback 
 */
const findEmail = (emailId, callback) => {
  User.findOne({ email: emailId }, (err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
/**
 * @description This function updates a user of the id passed
 * @param {string} findUserId 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} callback 
 * @returns err or data
 */
const findSingleUserAndUpdate = (
  findUserId,
  firstName,
  lastName,
  email,
  callback
) => {
  return User.findByIdAndUpdate(
    findUserId,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    { new: true },
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
};
/**
 * @description This function is used to delete a user of the id passed
 * @param {_id} findUserId 
 * @param {callback} callback 
 */
const deleteUser = (findUserId, callback) => {
  User.findByIdAndRemove(findUserId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * @description This function is used to reset the password
 * @param {string} token 
 * @param {string} password 
 * @param {callback} callback 
 */
const reset = (userId, password, callback) => {
    User.findOne({ _id: userId }, (err, user) => {
      user.password = password;
      user.save((err, user) => {
        return err ? callback(err, null) : callback(null, user);
      });
    });
};
module.exports = {
  User,
  createUser,
  findUser,
  findUsersId,
  findEmail,
  findSingleUserAndUpdate,
  deleteUser,
  reset,
};
