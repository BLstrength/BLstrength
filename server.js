require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', require('./api/contact'));

app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/strength', (req, res) => res.sendFile(path.join(__dirname, 'public', 'strength.html')));
app.get('/nutrition', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nutrition.html')));
app.get('/store', (req, res) => res.sendFile(path.join(__dirname, 'public', 'store.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`BL Strength running at http://localhost:${PORT}`);
});
