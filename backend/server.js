const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mindshiftt_user',
  password: 'your_password',
  database: 'mindshiftt_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
  } else {
    console.log('Connected to MySQL database.');
    // Create users table if not exists
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      )
    `;
    db.query(createUsersTable, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      }
    });
  }
});

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// GET / route
app.get('/', (req, res) => {
  res.send('Welcome to the Mindshiftt backend API');
});

// POST /signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if user exists
  db.query('SELECT username FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error.' });
      }
      return res.status(201).json({ message: 'User registered successfully.' });
    });
  });
});

// POST /login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  db.query('SELECT username, password FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mindshiftt backend server running on http://localhost:${PORT}`);
});
