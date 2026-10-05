const fs = require('fs');
const path = require('path');

function read(name) {
  const file = path.join(__dirname, '../data', name + '.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function write(name, data) {
  const dir = path.join(__dirname, '../data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name + '.json'), JSON.stringify(data, null, 2));
}

module.exports = { read, write };
