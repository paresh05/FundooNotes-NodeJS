const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
const createUser = (
  { firstName, lastName, email, mobileNumber, password },
  callback
) => {
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNumber: mobileNumber,
    password: password,
  });
  return user.save((err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
const findUser = (callback) => {
  User.find((err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};

const findUsersId = (findUserId, callback) => {
  User.findById(findUserId, (err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};

const findEmail = (emailId, callback) => {
  User.findOne({ email: emailId }, (err, user) => {
    return err ? callback(err, null) : callback(null, user);
  });
};
const findSingleUserAndUpdate = (
  findUserId,
  firstName,
  lastName,
  email,
  mobileNumber,
  password,
  callback
) => {
  return User.findByIdAndUpdate(
    findUserId,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
    },
    { new: true },
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
};
const deleteUser = (findUserId, callback) => {
  User.findByIdAndRemove(findUserId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
module.exports = {
  createUser,
  findUser,
  findUsersId,
  findEmail,
  findSingleUserAndUpdate,
  deleteUser,
};
