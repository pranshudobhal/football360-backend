const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('not user');

      return res.status(401).json({ success: false, message: 'No such user exists!!!' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log('not match');

      return res.status(401).json({ success: false, message: 'Error logging in!!!' });
    }
    console.log('below not match');

    const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '24h' });
    res.status(200).json({ success: true, token });
    console.log('end');
  } catch (error) {
    console.log('in error');

    res.json({ success: false, message: 'Some error with login!' });
  }
};

module.exports = { loginUser };
