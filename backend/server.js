import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for __dirname in ES Modules
/*import csrf from 'csurf';
import cookieParser from 'cookie-parser';*/
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
/*const csrfProtection = csrf({ cookie: true });*/

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mean')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(csrfProtection);
app.use(cookieParser());*/

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(session({
  secret: 'My Secret Key',
  saveUninitialized: true,
  resave: false,
}));

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');



// Pass CSRF token to all EJS templates
/*app.use((req, res, next) => {
  req.csrfToken = function () {
    return undefined;
  };
  res.locals.csrfToken = req.csrfToken();
  next();
});*/

// Serve static files from the correct "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/api', userRoutes);

// Error handler for CSRF errors
/*app.use((err, req, res, next) => {
  err.code = undefined;
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Form tampered with or session expired');
  } else {
    next(err);
  }
});*/

// Handle GET /add route
app.get('/add', (req, res) => {
  res.render('add_users', { title: "Home Page"}); // Render add_users.ejs
});

app.get('/', (req, res) => {
  res.render('index', { title: "Add Users"}); // Render home_page.ejs
});

app.get('/post', (req, res) =>
  res.render('post', {title: "Post Page"}));
/*app.get('/add', (req, res) =>
  res.render('add_user'));*/

app.get('/about', (req, res) =>
  res.render('about', {title: "About Page"})
);

app.get('/contact', (req, res) =>
  res.render('contact', { title: "Contact Page" })
);

app.get('/login', (req, res) =>
  res.render('login', {title: "Login Page"})
);

app.get('/signup', (req, res) =>
  res.render('signup', {title: "Signup Page"})
);

app.get('/logout', (req, res) => {
  // Handle logout logic (e.g., clearing session/cookies)
  res.redirect('/login');
});



// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
