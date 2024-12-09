import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  created: { type: Date, default: Date.now }
})

export default mongoose.model('Post', postSchema)
