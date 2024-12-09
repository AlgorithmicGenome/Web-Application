/*import express from "express";
import User from "../model/user.js";
/!*import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";*!/
import router from "./userRoutes.js";
const router = express.Router();

router.get("/user", (req, res) => {
  res.send("All Users")
});*/

/*// Signup Route
router.post('/signup', (req, res) => { // Removed unused `next`
  console.log(req.body);

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      return user.save();
    })
    .then(result => {
      res.status(201).json({
        success: true,
        data: result
      });
    })
    .catch(error => {
      // Check for duplicate user error (MongoDB unique constraint violation)
      if (error.code === 11000) { // Error code for duplicate key
        console.error('User already exists!');
        res.status(409).json({
          success: false,
          message: 'User already exists!'
        });
      } else {
        console.error('Error saving user:', error);
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    });
});

// Login Route
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Could not find user'
        });
      }

      // Compare the password
      return bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Invalid password'
          });
        }

        // Generate JWT token if passwords match
        const token = jwt.sign(
          { email: user.email, userId: user._id }, // Use user._id instead of req.body.password
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.status(200).json({
          success: true,
          token: token,
          expiresIn: 3600 // 1 hour
        });
      });
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});*/




/*export default router;*/
