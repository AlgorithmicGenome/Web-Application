import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.model('user', userSchema);

