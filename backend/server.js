const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // XAMPP default
  database: 'restaurant_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware for JWT auth
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, 'secretkey');  // Use env var for secret
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// API Routes
app.get('/api/menu', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
    if (err) return res.status(400).json({ error: 'User exists' });
    res.json({ message: 'Registered' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid' });
    const valid = bcrypt.compareSync(password, results[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid' });
    const token = jwt.sign({ id: results[0].id }, 'secretkey');
    res.json({ token, user: results[0] });
  });
});

app.get('/api/orders/:userId', verifyToken, (req, res) => {
  const { userId } = req.params;
  db.query('SELECT o.*, m.name FROM orders o JOIN menu m ON o.menu_item_id = m.id WHERE o.user_id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/order', verifyToken, (req, res) => {
  const { userId, items } = req.body;  // items: [{menuItemId, quantity}]
  items.forEach(item => {
    db.query('SELECT price FROM menu WHERE id = ?', [item.menuItemId], (err, results) => {
      const total = results[0].price * item.quantity;
      db.query('INSERT INTO orders (user_id, menu_item_id, quantity, total_price) VALUES (?, ?, ?, ?)', [userId, item.menuItemId, item.quantity, total]);
    });
  });
  res.json({ message: 'Order placed' });
});

// Add Menu Item (Admin)
app.post('/api/menu', verifyToken, (req, res) => {
  const { name, price, category, description, image } = req.body;
  db.query('INSERT INTO menu (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)', [name, parseFloat(price), category, description, image], (err) => {
    if (err) return res.status(400).json({ error: 'Failed to add item' });
    res.json({ message: 'Item added' });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));