const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const { loginUser } = require('../controllers/login.controller');

router.post('/', loginUser);

module.exports = router;
