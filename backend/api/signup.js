import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Signup Endpoint
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ success: true, message: 'Signup successful!' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, message: 'Signup failed.' });
  }
});

export default router;
