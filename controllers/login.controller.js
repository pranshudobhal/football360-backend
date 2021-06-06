const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '24h' });
        res.status(200).json({ success: true, user, token });
      } else {
        res.status(401).json({ success: false, message: 'Error logging in!!!', errorMessage: error.message });
      }
    } else {
      res.status(401).json({ success: false, message: 'No such user exists!!!', errorMessage: error.message });
    }
  } catch (error) {
    res.json({ success: false, message: 'Some error with login!', errorMessage: error.message });
  }
};

module.exports = { loginUser };
