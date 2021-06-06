const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user.model');
const { createNewUser } = require('../controllers/signup.controller');

router.post('/', createNewUser);

module.exports = router;
