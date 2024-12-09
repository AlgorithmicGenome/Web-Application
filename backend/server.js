import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mean')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(
  session({
    secret: 'My Secret Key',
    saveUninitialized: true,
    resave: false
  })
)

app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'welcome API server' })
})

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
