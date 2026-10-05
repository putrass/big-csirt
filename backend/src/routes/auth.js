const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { read, write } = require('../utils/store');
const { authMiddleware, adminOnly, SECRET } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = read('users');
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET, { expiresIn: '24h' });
  const { password: _, ...userWithoutPass } = user;
  res.json({ token, user: userWithoutPass });
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const users = read('users');
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  write('users', users);

  const token = jwt.sign({ id: newUser.id, role: newUser.role, email: newUser.email }, SECRET, { expiresIn: '24h' });
  const { password: _, ...userWithoutPass } = newUser;
  res.status(201).json({ token, user: userWithoutPass });
});

router.get('/me', authMiddleware, (req, res) => {
  const users = read('users');
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const { password: _, ...userWithoutPass } = user;
  res.json(userWithoutPass);
});

router.get('/users', authMiddleware, adminOnly, (req, res) => {
  const users = read('users');
  const safeUsers = users.map(({ password, ...u }) => u);
  res.json(safeUsers);
});

router.delete('/users/:id', authMiddleware, adminOnly, (req, res) => {
  let users = read('users');
  const initialLength = users.length;
  users = users.filter(u => u.id !== req.params.id);
  if (users.length === initialLength) return res.status(404).json({ error: 'User not found' });
  
  write('users', users);
  res.json({ message: 'User deleted' });
});

router.put('/users/:id', authMiddleware, adminOnly, (req, res) => {
  const { role } = req.body;
  const users = read('users');
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  user.role = role || user.role;
  write('users', users);
  const { password: _, ...userWithoutPass } = user;
  res.json(userWithoutPass);
});

module.exports = router;
