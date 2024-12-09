/*import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Login Endpoint
router.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
});

export default router;*/
