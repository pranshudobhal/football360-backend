const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { connectToDatabase } = require('./database/database');
const { addVideoToCollection } = require('./models/video.model');
const { addUserToCollection } = require('./models/user.model');

const { verifyAuth } = require('./authentication');

const videoRouter = require('./routers/video.router');
const loginRouter = require('./routers/login.router');
const signupRouter = require('./routers/signup.router');
const userRouter = require('./routers/user.router');
const likedVideoRouter = require('./routers/likedVideo.router');
const historyRouter = require('./routers/history.router');
const watchLaterRouter = require('./routers/watchLater.router');
const playlistRouter = require('./routers/playlist.router');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

connectToDatabase();

/**
 * Run addVideoToCollection() only when adding new data to video JSON
 */
// addVideoToCollection();
// addUserToCollection();

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/videos', videoRouter);

app.use(verifyAuth);
app.use('/likedvideo', likedVideoRouter);
app.use('/history', historyRouter);
app.use('/watchlater', watchLaterRouter);
app.use('/playlist', playlistRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Football360 API' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route does not exist!' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: 'Error occurred on server side!', errMessage: err.message });
});

app.listen(port, () => {
  console.log('Server ONLINE and running at PORT ' + port);
});
