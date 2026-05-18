require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));

app.post('/api/contact', require('./api/contact'));

app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'about.html')));
app.get('/strength', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'strength.html')));
app.get('/nutrition', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'nutrition.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'index.html')));

app.listen(PORT, () => {
  console.log(`BL Strength running at http://localhost:${PORT}`);
});
