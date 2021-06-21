const express = require('express');
const router = express.Router();
const { getAllVideos, getVideoByID } = require('../controllers/video.controller');

router.get('/', getAllVideos);

router.get('/:videoID', getVideoByID);

module.exports = router;
