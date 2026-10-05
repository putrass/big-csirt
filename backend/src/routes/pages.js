const router = require('express').Router();
const { read, write } = require('../utils/store');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/:slug', (req, res) => {
  const pages = read('pages');
  const page = pages[req.params.slug];
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

router.put('/:slug', authMiddleware, adminOnly, (req, res) => {
  const pages = read('pages');
  const { title, body } = req.body;
  
  if (!pages[req.params.slug]) {
    pages[req.params.slug] = {};
  }
  
  pages[req.params.slug] = {
    ...pages[req.params.slug],
    ...(title && { title }),
    ...(body && { body })
  };
  
  write('pages', pages);
  res.json(pages[req.params.slug]);
});

module.exports = router;
