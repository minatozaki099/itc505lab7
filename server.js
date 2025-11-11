const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// ✅ Serve static files from "public/ITC505/lab-7"
const staticPath = path.join(__dirname, 'public', 'ITC505', 'lab-7');
server.use(express.static(staticPath));

// ✅ Root route → load your index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Mad Lib POST route handler
server.post('/ITC505/lab-7', (req, res) => {
  const { adjective1, pluralNoun, verb, adjective2, noun, place } = req.body;

  // Validate that all fields are filled
  if (!adjective1 || !pluralNoun || !verb || !adjective2 || !noun || !place) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Submission Failed</title>
      </head>
      <body>
        <h1>❌ Please fill all fields!</h1>
        <a href="/index.html">Go Back</a>
      </body>
      </html>
    `);
    return;
  }

  const madLib = `
    Once upon a time in ${place}, there lived a ${adjective1} explorer 
    who loved to collect ${pluralNoun}. Every morning, they would wake up early 
    and start ${verb} around the neighborhood. One day, they discovered a 
    ${adjective2} ${noun} hidden behind an old oak tree.
  `;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Mad Lib Story</title>
    </head>
    <body>
      <h1>Your Mad Lib Story 🎉</h1>
      <p>${madLib}</p>
      <a href="/index.html">Create Another</a>
    </body>
    </html>
  `);
});

// ✅ Port setup for Render
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
});
