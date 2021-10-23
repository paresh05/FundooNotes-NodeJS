const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtUtil = require("../../utility/jwt");
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
  callback
) => {
  return User.findByIdAndUpdate(
    findUserId,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
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

const reset = (token, password, callback) => {
  jwtUtil.tokenVerification(token, (err, data) => {
    email = data.email;
    User.findOne({ email: email }, (err, user) => {
      user.password = password;
      user.save((err, user) => {
        return err ? callback(err, null) : callback(null, user);
      });
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
