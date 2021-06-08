const mongoose = require('mongoose');
const { Schema } = mongoose;

const likedVideoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

const LikedVideo = mongoose.model('LikedVideo', likedVideoSchema);

module.exports = { LikedVideo };
