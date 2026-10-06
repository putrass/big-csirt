const router = require('express').Router();
const { v4: uuidv4 } = require('../utils/uuid');
const { read, write } = require('../utils/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (req, res) => {
  const items = read('gallery');
  if (req.query.type) {
    return res.json(items.filter(i => i.type === req.query.type));
  }
  res.json(items);
});

router.post('/', authMiddleware, (req, res) => {
  const items = read('gallery');
  const newItem = { id: uuidv4(), ...req.body };
  items.push(newItem);
  write('gallery', items);
  res.status(201).json(newItem);
});

router.put('/:id', authMiddleware, (req, res) => {
  const items = read('gallery');
  const index = items.findIndex(i => i.id === req.params.id || i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  
  items[index] = { ...items[index], ...req.body };
  write('gallery', items);
  res.json(items[index]);
});

router.delete('/:id', authMiddleware, (req, res) => {
  let items = read('gallery');
  const initialLength = items.length;
  items = items.filter(i => i.id !== req.params.id && i.id !== parseInt(req.params.id));
  if (items.length === initialLength) return res.status(404).json({ error: 'Not found' });
  
  write('gallery', items);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
