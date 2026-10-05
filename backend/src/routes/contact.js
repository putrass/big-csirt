const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { read, write } = require('../utils/store');

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const contacts = read('contacts');
  const newContact = {
    id: uuidv4(),
    name,
    email,
    subject: subject || '',
    message,
    createdAt: new Date().toISOString()
  };
  
  contacts.push(newContact);
  write('contacts', contacts);
  
  res.status(201).json({ message: 'Message sent successfully', contact: newContact });
});

module.exports = router;
