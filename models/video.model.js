const mongoose = require('mongoose');
const { Schema } = mongoose;
const allVideos = require('./video.data');

const videoSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Video ID cannot be empty'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  url: {
    type: String,
    required: [true, 'URL cannot be empty'],
  },
  channel: {
    type: String,
    required: [true, 'Channel Name cannot be empty'],
  },
  subscribers: {
    type: String,
    required: [true, 'Subscribers cannot be empty'],
  },
  channelThumbnail: {
    type: String,
    required: [true, 'Channel thumbnail cannot be empty'],
  },
  videoThumbnail: {
    type: String,
    required: [true, 'Video thumbnail cannot be empty'],
  },
  videoDescription: {
    type: String,
    required: [true, 'Video description cannot be empty'],
  },
  views: {
    type: String,
    required: [true, 'Views cannot be empty'],
  },
  time: {
    type: String,
    required: [true, 'Time cannot be empty'],
  },
});

const Video = mongoose.model('Video', videoSchema);

async function addVideoToCollection() {
  try {
    allVideos.forEach(async (video) => {
      const newVideo = new Video(video);
      await newVideo.save();
    });
    console.log('Video Data added successfully to database');
  } catch (error) {
    console.log('Error adding video data to database');
  }
}

module.exports = { Video, addVideoToCollection };
