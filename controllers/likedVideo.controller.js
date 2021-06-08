const { LikedVideo } = require('../models/likedVideo.model ');

const getAllLikedVideos = async (req, res) => {
  try {
    const allLikedVideos = await LikedVideo.find({});
    res.json({ success: true, allLikedVideos });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving liked videos!', errorMessage: error.message });
  }
};

const addToLikedVideos = async (req, res) => {
  try {
    const { videoID } = req.params;
    const userID = '60bcfb9d8af3d639fc09aa27';
    const user = await LikedVideo.findById(userID);

    if (!user) {
      const newLikedVideo = new LikedVideo({
        _id: userID,
        videos: [{ _id: videoID }],
      });
      await newLikedVideo.save();
      res.json({ success: true, message: 'New document has been created and video has been added to liked video', newLikedVideo });
    } else {
      const newLikedVideo = { _id: videoID };
      user.videos.push(newLikedVideo);
      await user.save();
      res.json({ success: true, message: 'Video added to exisitng liked videos', user });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving liked videos!', errorMessage: error.message });
  }
};

const deleteFromLikedVideos = async (req, res) => {
  try {
    const { videoID } = req.params;
    const userID = '60bcfb9d8af3d639fc09aa27';
    const user = await LikedVideo.findById(userID);
    await user.videos.remove(videoID);
    await user.save();
    res.json({ success: true, message: 'Video removed from liked videos', user });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting video from liked videos!', errorMessage: error.message });
  }
};

module.exports = { getAllLikedVideos, addToLikedVideos, deleteFromLikedVideos };
