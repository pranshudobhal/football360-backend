const { Video } = require('../models/video.model');

const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find({}).select('_id name');
    res.json({ success: true, allVideos });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving videos!', errorMessage: error.message });
  }
};

const getVideoByID = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Video.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

module.exports = { getAllVideos, getVideoByID };
