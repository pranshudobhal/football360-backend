const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { History } = require('../models/history.model');
const { getAllHistory, deleteAllHistory, addToHistory, deleteFromHistory } = require('../controllers/history.controller');

router.get('/', getAllHistory);
router.delete('/', deleteAllHistory);
router.post('/:videoID', addToHistory);
router.delete('/:videoID', deleteFromHistory);

module.exports = router;
