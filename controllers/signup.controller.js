const { User } = require('../models/user.model');
const { LikedVideo } = require('../models/likedVideo.model ');
const { History } = require('../models/history.model');
const { WatchLater } = require('../models/watchLater.model');
const { Playlist } = require('../models/playlist.model');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const saltRounds = 10;
    const user = await User.find({ email });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (user.length >= 1) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    } else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });

      const newLikedVideo = new LikedVideo({
        _id: newUser._id,
        videos: [],
      });

      const newHistory = new History({
        _id: newUser._id,
        videos: [],
      });

      const newPlaylist = new Playlist({
        _id: newUser._id,
        playlists: [],
      });

      const newWatchLater = new WatchLater({
        _id: newUser._id,
        videos: [],
      });

      const token = jwt.sign({ userID: newUser._id }, process.env.SECRET, { expiresIn: '24h' });

      await newUser.save();
      await newLikedVideo.save();
      await newHistory.save();
      await newPlaylist.save();
      await newWatchLater.save();

      res.status(201).json({ success: true, message: 'User has been created', token });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error creating new user!', errorMessage: error.message });
  }
};

module.exports = { createNewUser };
