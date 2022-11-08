const { WatchLater } = require('../models/watchLater.model');

const getAllWatchLater = async (req, res) => {
  try {
    const { userID } = req.user;
    const allWatchLater = await WatchLater.findById(userID).populate('videos');
    res.json({ success: true, allWatchLater });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving watch later!', errorMessage: error.message });
  }
};

const addToWatchLater = async (req, res) => {
  try {
    const { videoID } = req.params;
    const { userID } = req.user;
    const user = await WatchLater.findById(userID);

    if (!user) {
      const newWatchLater = new WatchLater({
        _id: userID,
        videos: [{ _id: videoID }],
      });
      await newWatchLater.save();
      res.json({ success: true, message: 'New document has been created and video has been added to watch later', newWatchLater });
    } else {
      const newWatchLater = { _id: videoID };
      user.videos.push(newWatchLater);
      await user.save();
      res.json({ success: true, message: 'Video added to watch later', user });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving watch later!', errorMessage: error.message });
  }
};

const deleteFromWatchLater = async (req, res) => {
  try {
    const { videoID } = req.params;
    const { userID } = req.user;
    const user = await WatchLater.findById(userID);
    await user.videos.remove(videoID);
    await user.save();
    res.json({ success: true, message: 'Video removed from watch later', user });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving history!', errorMessage: error.message });
  }
};

module.exports = { getAllWatchLater, addToWatchLater, deleteFromWatchLater };
