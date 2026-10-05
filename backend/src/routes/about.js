const router = require('express').Router();
const { read, write } = require('../utils/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (req, res) => {
  let about = read('about');
  if (Array.isArray(about)) about = {}; // Ensure object if array returned by default store logic
  res.json(about);
});

router.put('/', authMiddleware, (req, res) => {
  let about = read('about');
  if (Array.isArray(about)) about = {};
  
  const updatedAbout = { ...about, ...req.body };
  write('about', updatedAbout);
  res.json(updatedAbout);
});

module.exports = router;
