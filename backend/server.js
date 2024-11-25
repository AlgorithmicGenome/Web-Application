import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http'; // Import the http module
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from Angular app
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/backend')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// User Schema (for Authentication)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Post Schema (for Posts)
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

// Routes

// Signup Route (Register new user)
app.post('/api/signup', async (req, res) => {
  console.log(req.body); // Log the body to see its content
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login Route (Authenticate user and return JWT)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};

// Get All Posts (No Authentication needed)
app.get('/api/posts', (req, res) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Create Post (Authentication required)
app.post('/api/posts', authenticateJWT, (req, res) => {
  console.log('Received POST request:', req.body);
  const { title, content } = req.body;
  const post = new Post({ title, content });
  post.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Normalize port function
const normalizePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};

// Error handling for server
const onError = err => {
  if (err.syscall !== "listen") {
    throw err;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (err) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      break;
    default:
      throw err;
  }
};

// Log when the server starts listening
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  console.log("Listening on " + bind);
};

// Get the port from environment variables or fallback to 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create the server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

// Gracefully handle server shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});
