const mongoose = require("mongoose");
const { userConnection } = require('../connection');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // job: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   validate(value) {
    //     if (value.length < 2)
    //       throw new Error("Invalid job, must be at least 2 characters.");
    //   },
    // },
    hash: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    favorites: {
      type: [{type: String, required: true}]
    }
  },
  { collection: "users_list" }
);

const User = userConnection.model('user', UserSchema);

module.exports = User;
