const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Video } = require('../models/video.model');
const { getAllVideos, getVideoByID } = require('../controllers/video.controller');
const { verifyAuth } = require('../authentication');

router.get('/', getAllVideos);

router.get('/:videoID', verifyAuth, getVideoByID);

module.exports = router;
