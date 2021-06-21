const express = require('express');
const router = express.Router();
const { getAllWatchLater, addToWatchLater, deleteFromWatchLater } = require('../controllers/watchLater.controller');

router.get('/', getAllWatchLater);
router.post('/:videoID', addToWatchLater);
router.delete('/:videoID', deleteFromWatchLater);

module.exports = router;
