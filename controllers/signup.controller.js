const { User } = require('../models/user.model');

/**
 * TODO:
 * Functionality has not been implemented
 */

const createNewUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: 'Error creating new user!', errorMessage: error.message });
  }
};

module.exports = { createNewUser };
