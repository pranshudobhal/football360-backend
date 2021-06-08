const { History } = require('../models/history.model');

const getAllHistory = async (req, res) => {
  try {
    const userID = '60bcfb9d8af3d639fc09aa27';
    const allHistory = await History.findById(userID);
    res.json({ success: true, allHistory });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving liked videos!', errorMessage: error.message });
  }
};

const deleteAllHistory = async (req, res) => {
  try {
    const userID = '60bcfb9d8af3d639fc09aa27';
    const history = await History.findById(userID);
    await history.updateOne({ $set: { videos: [] } });
    await history.save();
    res.json({ success: true, history });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving history!', errorMessage: error.message });
  }
};

const addToHistory = async (req, res) => {
  try {
    const { videoID } = req.params;
    const userID = '60bcfb9d8af3d639fc09aa27';
    const history = await History.findById(userID);

    if (!history) {
      const newHistory = new History({
        _id: userID,
        videos: [{ _id: videoID }],
      });
      await newHistory.save();
      res.json({ success: true, message: 'New document has been created and video has been added to history', newHistory });
    } else {
      const alreadyPresentInHistory = history.videos.includes(videoID);
      console.log(alreadyPresentInHistory);

      if (alreadyPresentInHistory) {
        await history.videos.remove(videoID);
      }
      const newHistory = { _id: videoID };
      history.videos.push(newHistory);
      await history.save();
      res.json({ success: true, message: 'Video added to exisitng history', history });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving history!', errorMessage: error.message });
  }
};

const deleteFromHistory = async (req, res) => {
  try {
    const { videoID } = req.params;
    const userID = '60bcfb9d8af3d639fc09aa27';
    const history = await History.findById(userID);
    await history.videos.remove(videoID);
    await history.save();
    res.json({ success: true, message: 'Video removed from history', history });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving history!', errorMessage: error.message });
  }
};

module.exports = { getAllHistory, deleteAllHistory, addToHistory, deleteFromHistory };
