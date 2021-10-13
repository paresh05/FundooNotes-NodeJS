const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
const createUser = ({ firstName, lastName, email, mobileNumber }, callback) => {
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNumber: mobileNumber,
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

const findSingleUserAndUpdate = (findUserId,firstName, lastName,email, mobileNumber, callback) => {
  return User.findByIdAndUpdate(
    findUserId,
    { firstName: firstName, lastName: lastName,email:email, mobileNumber:mobileNumber},
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
module.exports = { createUser, findUser, findUsersId, findSingleUserAndUpdate, deleteUser };
