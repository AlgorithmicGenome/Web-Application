import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // For password hashing
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/backend')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// User Schema (Authentication)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware to Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Get token from header
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user; // Attach user to request
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if token is missing
  }
};

// User Signup Route
app.post('/api/user/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup.js:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// User Login Route
app.post('/api/user/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login.js:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Example Authenticated Route
app.get('/api/posts', authenticateJWT, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts.js:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});












/*import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // For password hashing
import dotenv from 'dotenv';

dotenv.config();

/!*const express = require('express');*!/
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/backend')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// User Schema (Authentication)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Login Route (add password check)
app.post('/api/user/login.js', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Add password verification here (you can hash passwords with bcrypt)
    if (password !== user.password) { // Use bcrypt to compare hashed password in production
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token }); // Send the token
  } catch (err) {
    console.error('Error during login.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Get token from header
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user; // Attach user to request
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if token is missing
  }
};

// Public Route: Get All Posts
app.get('/api/posts.js', async (req, res) => {
  try {
    const posts.js = await Post.find();
    res.status(200).json(posts.js);
  } catch (err) {
    console.error('Error fetching posts.js:', err);
    res.status(500).json({ error: err.message });
  }
});

// Authenticated Route: Create Post
app.post('/api/posts.js', authenticateJWT, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const post = new Post({ title, content });
    const result = await post.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: err.message });
  }
});

// Authenticated Route: Update Post
app.put('/api/posts.js/:postId', authenticateJWT, async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: err.message });
  }
});

// User Signup Route (Add this route if missing)
app.post('/api/user/signup.js', async (req, res) => {
  console.log('Signup request received:', req.body);
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Respond with a success message
    res.status(201).send({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup.js:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// User Login Route
app.post('/api/user/login.js', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login.js:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
