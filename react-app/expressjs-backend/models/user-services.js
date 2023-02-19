const mongoose = require("mongoose");
const User = require('./user');
mongoose.set("debug", true);


async function getUsers(name) {
  let result;
  if (name === undefined) {
    result = await userModel.find();
  } else if (name) {
    result = await findUserByName(name);
  }
  return result;
}
// async function getUsers(name, job) {
//   let result;
//   if (name === undefined && job === undefined) {
//     result = await userModel.find();
//   } else if (name && !job) {
//     result = await findUserByName(name);
//   } else if (job && !name) {
//     result = await findUserByJob(job);
//   }
//   return result;
// }

async function findUserById(id) {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new User(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await User.find({ name: name });
}

// async function findUserByJob(job) {
//   return await User.find({ job: job });
// }

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
