const express = require('express');
const router = express.Router();
const { getAllLikedVideos, addToLikedVideos, deleteFromLikedVideos } = require('../controllers/likedVideo.controller');

router.get('/', getAllLikedVideos);
router.post('/:videoID', addToLikedVideos);
router.delete('/:videoID', deleteFromLikedVideos);

module.exports = router;
