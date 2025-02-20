const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);