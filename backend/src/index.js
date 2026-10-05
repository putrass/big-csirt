const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/agenda', require('./routes/agenda'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/contact', require('./routes/contact'));
// keep existing:
app.use('/api/carousel', require('./routes/carousel'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/attack-stats', require('./routes/attackStats'));
app.use('/api/advisories', require('./routes/advisories'));
app.use('/api/education', require('./routes/education'));
app.use('/api/about', require('./routes/about'));
app.use('/api/nav', require('./routes/nav'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
