const router = require('express').Router();

// Static seed data – in production, replace with real WAF/SIEM data
let totalAttacks = 97551;

const attackTypes = [
  { rank: 1, name: 'Reconnaissance', count: 52591, color: '#ff3b5c' },
  { rank: 2, name: 'SQL Injection', count: 11014, color: '#ff8c00' },
  { rank: 3, name: 'Unrestricted File Upload', count: 9425, color: '#0093dd' },
  { rank: 4, name: 'Authentication Attack', count: 9100, color: '#0093dd' },
];

const topCountries = [
  { rank: 1, flag: '🇮🇩', name: 'Indonesia', count: 52725, color: '#ff8c00' },
  { rank: 2, flag: '🇺🇸', name: 'United States', count: 6272, color: '#0093dd' },
  { rank: 3, flag: '🇨🇦', name: 'Canada', count: 3306, color: '#0093dd' },
  { rank: 4, flag: '🇪🇨', name: 'Ecuador', count: 2075, color: '#0093dd' },
];

const topIPs = [
  { rank: 1, ip: '114.10.78.211', count: 30312, color: '#ff3b5c' },
  { rank: 2, ip: '157.85.206.208', count: 8824, color: '#ff8c00' },
  { rank: 3, ip: '184.75.221.82', count: 3250, color: '#0093dd' },
  { rank: 4, ip: '13.59.252.103', count: 2945, color: '#0093dd' },
  { rank: 5, ip: '202.152.31.49', count: 2853, color: '#0093dd' },
];

const ATTACK_TYPE_LABELS = ['Reconnaissance', 'SQL Injection', 'Unrestricted File Upload', 'Authentication Attack', 'XSS', 'CSRF', 'Path Traversal'];
const CITY_SOURCES = [
  { city: 'Jakarta', flag: '🇮🇩' }, { city: 'Paris', flag: '🇫🇷' },
  { city: 'Washington DC', flag: '🇺🇸' }, { city: 'Amsterdam', flag: '🇳🇱' },
  { city: 'Singapore', flag: '🇸🇬' }, { city: 'Beijing', flag: '🇨🇳' },
  { city: 'Moscow', flag: '🇷🇺' }, { city: 'Toronto', flag: '🇨🇦' },
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeLiveFeed() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const time = `${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`;
  const src = randomFrom(CITY_SOURCES);
  const type = randomFrom(ATTACK_TYPE_LABELS);
  const severities = ['High', 'Critical', 'Medium'];
  return {
    time,
    type,
    source: `${src.flag} ${src.city}`,
    target: 'Komdigi',
    severity: randomFrom(severities),
  };
}

router.get('/', (_req, res) => {
  // Slightly randomise total to simulate live counter
  totalAttacks += Math.floor(Math.random() * 5);
  res.json({
    totalAttacks,
    attackTypes,
    topCountries,
    topIPs,
    liveFeed: Array.from({ length: 4 }, makeLiveFeed),
  });
});

module.exports = router;
