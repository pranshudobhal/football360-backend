const express = require('express');
const router = express.Router();
const { getAllPlaylists, addNewPlaylist, deletePlaylist, getIndividualPlaylist, updatePlaylistName, addVideoToPlaylist, deleteVideoFromPlaylist } = require('../controllers/playlist.controller');

router.get('/', getAllPlaylists);
router.post('/', addNewPlaylist);
router.delete('/:playlistID', deletePlaylist);

// Get all data of an individual playlist
router.get('/:playlistID', getIndividualPlaylist);
// Update name in playlist
router.post('/:playlistID', updatePlaylistName);
// Add a video to playlist
router.post('/:playlistID/:videoID', addVideoToPlaylist);
// Delete a video from playlist
router.delete('/:playlistID/:videoID', deleteVideoFromPlaylist);

module.exports = router;
