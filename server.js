require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json()); // JSON body parsing

// Bonus: custom request-logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`
    );
  });
  next();
});

// Serve static files from /public (index.html is served at "/")
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---

// GET /  -> "My Week 2 API!" (plain text for API clients such as curl/Postman,
// while browsers asking for HTML get the static page in /public/index.html)
app.get('/', (req, res) => {
  if (req.accepts(['html', 'text']) === 'html') {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.send('My Week 2 API!');
});

// POST /user -> accepts { name, email }, responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both name and email are required.' });
  }

  res.status(200).send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// --- Error handling ---

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Central error handler (also catches malformed JSON -> 400)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
