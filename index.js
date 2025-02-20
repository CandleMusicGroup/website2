const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON ve form verilerini okumak için middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public klasörünü statik olarak sunma
app.use(express.static('public'));

// Multer ayarları: Dosyaların 'uploads' klasörüne kaydedilmesi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Basit bir hafıza içi veri yapısı (gerçek bir uygulamada veritabanı kullanılmalıdır)
let tracks = [];

// Ana sayfa: index.html'i sunar
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Müzik dosyası yükleme rotası
app.post('/upload', upload.single('musicFile'), (req, res) => {
  // Yüklenen dosyayı ve başlık bilgisini kaydediyoruz
  const track = {
    title: req.body.title,
    filename: req.file.filename
  };
  tracks.push(track);
  res.redirect('/');
});

// Yüklenen parçaların listesini dönen API rotası
app.get('/tracks', (req, res) => {
  res.json(tracks);
});

// Sunucuyu başlatma
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});