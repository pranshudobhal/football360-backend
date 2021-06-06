const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;
const users = require('./user.data');

/**
 * TODO:
 * 1. Username implementation
 */

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name cannot be empty'],
    unique: true,
  },
  lastName: {
    type: String,
  },
  // username: {
  //   type: String,
  //   required: [true, 'Username cannot be empty'],
  //   unique: true,
  // },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: [true, 'Email cannot be empty'],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
  },
});

const User = mongoose.model('User', userSchema);

async function addUserToCollection() {
  try {
    users.forEach(async (user) => {
      const newUser = new User(user);
      await newUser.save();
    });
    console.log('User data added successfully to database');
  } catch (error) {
    console.log('Error adding user data to database');
  }
}

module.exports = { User, addUserToCollection };
