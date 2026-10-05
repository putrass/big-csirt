const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { read, write } = require('./store');
const { authMiddleware } = require('../middleware/auth');

module.exports = function crud(name) {
  const router = express.Router();

  router.get('/', (req, res) => res.json(read(name)));

  router.get('/:id', (req, res) => {
    const item = read(name).find(i => i.id === req.params.id || i.slug === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  router.post('/', authMiddleware, (req, res) => {
    const items = read(name);
    const item = { id: uuidv4(), createdAt: new Date().toISOString(), ...req.body };
    items.push(item);
    write(name, items);
    res.status(201).json(item);
  });

  router.put('/:id', authMiddleware, (req, res) => {
    const items = read(name);
    const idx = items.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    items[idx] = { ...items[idx], ...req.body, id: items[idx].id };
    write(name, items);
    res.json(items[idx]);
  });

  router.delete('/:id', authMiddleware, (req, res) => {
    const items = read(name);
    const next = items.filter(i => i.id !== req.params.id);
    if (next.length === items.length) return res.status(404).json({ error: 'Not found' });
    write(name, next);
    res.json({ message: 'Deleted' });
  });

  return router;
};

