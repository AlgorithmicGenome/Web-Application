import express from 'express'
import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: encryptedPassword
    })

    await newUser.save()
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...rest } = user._doc
      const token = jwt.sign(
        { id: rest._id, email: rest.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d'
        }
      )
      return res
        .status(200)
        .json({ success: true, user: rest, token, expiresIn: 86400 })
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

export default router
