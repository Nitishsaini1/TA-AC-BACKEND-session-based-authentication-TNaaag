const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET request to render the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// POST request to handle registration
router.post('/register', async (req, res) => {
  const { name, email, password, age, phone } = req.body;
  
  // Validate the data
  if (!name || !email || !password || !age || !phone) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create a new user
    const newUser = new User({ name, email, password, age, phone });
    await newUser.save();
    
    res.send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
