const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/frameworks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frameworks.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Quiz API (GET and POST)
app.get('/api/quiz', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'quiz.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading quiz.json:', err);
      return res.status(500).send('Failed to load quiz data');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/api/quiz', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'quiz.json');
  const json = JSON.stringify(req.body, null, 2);

  fs.writeFile(filePath, json, err => {
    if (err) {
      console.error('Error writing quiz.json:', err);
      return res.status(500).send('Failed to save quiz data');
    }
    res.send({ message: 'Quiz data updated successfully' });
  });
});

// Contact form handler
/*
app.post('/submit-contact', (req, res) => {
  const { phone, email, zip } = req.body;

  if (!phone || !email || !zip) {
    return res.status(400).send('Missing required fields.');
  }

  const entry = `${new Date().toISOString()} | Phone: ${phone}, Email: ${email}, ZIP: ${zip}\n`;
  const contactFile = path.join(__dirname, 'data', 'contact-submissions.txt');

  fs.appendFile(contactFile, entry, err => {
    if (err) {
      console.error('Error writing contact info:', err);
      return res.status(500).send('Failed to save contact info.');
    }
    res.send('Contact information received. Thank you!');
  });
});
*/


app.post('/submit-contact', (req, res) => {
  console.log('Contact submission:', req.body);
  res.send('Form submitted successfully!');
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
