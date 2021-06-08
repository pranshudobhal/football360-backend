const { Playlist } = require('../models/playlist.model');

const getAllPlaylists = async (req, res) => {
  try {
    const allPlaylists = await Playlist.find({});
    res.json({ success: true, allPlaylists });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving videos!', errorMessage: error.message });
  }
};

const addNewPlaylist = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

const getIndividualPlaylist = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

const updatePlaylistName = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

const deleteVideoFromPlaylist = async (req, res) => {
  try {
    const { videoID } = req.params;
    const video = await Playlist.find({ _id: videoID });
    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving video by ID!', errorMessage: error.message });
  }
};

module.exports = { getAllPlaylists, addNewPlaylist, deletePlaylist, getIndividualPlaylist, updatePlaylistName, addVideoToPlaylist, deleteVideoFromPlaylist };
