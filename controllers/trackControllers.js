const Track = require('../models/Track');

exports.uploadTrack = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya bulunamadı' });
    }
    const track = new Track({
      title,
      filename: req.file.filename,
      uploadedBy: req.user.id
    });
    await track.save();
    res.status(201).json({ message: 'Parça Candle Music Group platformuna yüklendi', track });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.find().populate('uploadedBy', 'username').sort({ uploadedAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};