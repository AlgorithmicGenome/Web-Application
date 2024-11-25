const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Assuming you have a User model for MongoDB or any database
const User = require('../models/User');

// Signup route
router.post('/onsignup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate a token (optional)
    const token = jwt.sign({ id: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
