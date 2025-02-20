
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB\'ye bağlanıldı'))
  .catch(err => console.error(err));

// Middleware ayarları
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar (frontend için, örn. index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota tanımlamaları
const authRoutes = require('./routes/auth');
const trackRoutes = require('./routes/tracks');

app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);

// Ana sayfa – Candle Music Group
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});