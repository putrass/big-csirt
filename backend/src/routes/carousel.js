const router = require('express').Router();
const { v4: uuidv4 } = require('../utils/uuid');
const { read, write } = require('../utils/store');
const { authMiddleware } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(read('carousel'));
});

router.post('/', authMiddleware, (req, res) => {
  const items = read('carousel');
  const newItem = { id: uuidv4(), ...req.body };
  items.push(newItem);
  write('carousel', items);
  res.status(201).json(newItem);
});

router.put('/:id', authMiddleware, (req, res) => {
  const items = read('carousel');
  const index = items.findIndex(i => i.id === req.params.id || i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  
  items[index] = { ...items[index], ...req.body };
  write('carousel', items);
  res.json(items[index]);
});

router.delete('/:id', authMiddleware, (req, res) => {
  let items = read('carousel');
  const initialLength = items.length;
  items = items.filter(i => i.id !== req.params.id && i.id !== parseInt(req.params.id));
  if (items.length === initialLength) return res.status(404).json({ error: 'Not found' });
  
  write('carousel', items);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
