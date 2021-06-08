const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

const History = mongoose.model('History', historySchema);

module.exports = { History };
