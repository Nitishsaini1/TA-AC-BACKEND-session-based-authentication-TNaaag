const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to set a cookie with your name
app.use((req, res, next) => {
  res.cookie('name', 'YourName', { maxAge: 3600000, httpOnly: true }); // Replace 'YourName' with your actual name
  next();
});

// Route to check the cookie
app.get('/checkcookie', (req, res) => {
  const name = req.cookies.name;
  if (name) {
    res.send(`Cookie found: Your name is ${name}`);
  } else {
    res.send('No cookie found');
  }
});

// Route to access cookies
app.get('/getcookies', (req, res) => {
  res.send(req.cookies);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
