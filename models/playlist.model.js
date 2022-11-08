const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  playlists: [
    {
      _id: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      videos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Video',
        },
      ],
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
