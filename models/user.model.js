const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;
const users = require('./user.data');

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: [true, 'First Name cannot be empty'],
  },
  lastName: {
    type: String,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: [true, 'Email cannot be empty'],
    unique: true,
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
