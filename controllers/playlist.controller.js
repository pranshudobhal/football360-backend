const { Playlist } = require('../models/playlist.model');
const { v4: uuidv4 } = require('uuid');

const getAllPlaylists = async (req, res) => {
  try {
    const { userID } = req.user;
    const allPlaylists = await Playlist.findById(userID).populate('playlists.videos');
    res.json({ success: true, allPlaylists });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving playlists!', errorMessage: error.message });
  }
};

const addNewPlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { videoID, playlistName } = req.body;
    const userPlaylist = await Playlist.findById(userID);

    if (!userPlaylist) {
      const newPlaylist = new Playlist({
        _id: userID,
        playlists: [
          {
            _id: uuidv4(),
            name: playlistName,
            videos: [{ _id: videoID }],
          },
        ],
      });
      await newPlaylist.save();
      res.json({ success: true, message: 'New playlist has been created', newPlaylist });
    } else {
      const newPlaylist = { _id: uuidv4(), name: playlistName, videos: [{ _id: videoID }] };
      userPlaylist.playlists.push(newPlaylist);
      await userPlaylist.save();

      res.json({ success: true, message: 'New playist has been added to user playlists', newPlaylist });
    }
  } catch (error) {
    res.json({ success: false, message: 'Error creating playlist!', errorMessage: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistID } = req.params;
    const userPlaylist = await Playlist.findById(userID);
    await userPlaylist.playlists.remove(playlistID);
    await userPlaylist.save();
    res.json({ success: true, userPlaylist });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting playlist!', errorMessage: error.message });
  }
};

const getIndividualPlaylist = async (req, res) => {
  try {
    const { userID } = req.user;
    const { playlistID } = req.params;
    const userPlaylist = await Playlist.findById(userID);
    const playlist = await userPlaylist.findById(playlistID);
    res.json({ success: true, playlist });
  } catch (error) {
    res.json({ success: false, message: 'Error retrieving individual playlist!', errorMessage: error.message });
  }
};

const updatePlaylistName = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const { userID } = req.user;
    const { playlistName } = req.body;
    const userPlaylist = await Playlist.findById(userID);
    const playlist = userPlaylist.playlists.map((playlist) => {
      if (playlist.id === playlistID) {
        return (playlist.name = playlistName);
      }
      return playlist;
    });
    await userPlaylist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.json({ success: false, message: 'Error updating playlist name!', errorMessage: error.message });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
    const { playlistID, videoID } = req.params;
    const { userID } = req.user;
    const userPlaylist = await Playlist.findById(userID);
    const playlist = userPlaylist.playlists.find((playlistItem) => playlistItem.id === playlistID);
    playlist.videos.push(videoID);
    await userPlaylist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.json({ success: false, message: 'Error adding video to playlist!', errorMessage: error.message });
  }
};

const deleteVideoFromPlaylist = async (req, res) => {
  try {
    const { playlistID, videoID } = req.params;
    const { userID } = req.user;
    const userPlaylist = await Playlist.findById(userID);
    const playlist = userPlaylist.playlists.find((playlistItem) => playlistItem.id === playlistID);
    await playlist.videos.remove(videoID);
    await userPlaylist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.json({ success: false, message: 'Error deleting video from playlist!', errorMessage: error.message });
  }
};

module.exports = { getAllPlaylists, addNewPlaylist, deletePlaylist, getIndividualPlaylist, updatePlaylistName, addVideoToPlaylist, deleteVideoFromPlaylist };
