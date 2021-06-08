const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { WatchLater } = require('../models/watchLater.model');
const { getAllWatchLater, addToWatchLater, deleteFromWatchLater } = require('../controllers/watchLater.controller');

router.get('/', getAllWatchLater);
router.post('/:videoID', addToWatchLater);
router.delete('/:videoID', deleteFromWatchLater);

module.exports = router;
