import express from 'express';
/*import multer from "multer";*/
import User from "../model/user.js";

const router = express.Router();

// Set up multer for file storage
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage,
}).single("image");*/

// Route to handle file uploads
// Handle adding a new user (or "post")
router.post('/api/add', async (req, res) => {
  try {
    const { name, phone, title, content, email, } = req.body;

    const newUser = new User({
      name,
      phone,
      title,
      content,
      email,
    });

    await newUser.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

export default router;
