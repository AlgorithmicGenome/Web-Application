import jwt from 'jsonwebtoken'

const authenticateJWT = (req, res, next) => {
  const token =
    req.header('Authorization') && req.header('Authorization').split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT error:', err)
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.userData = decoded // Attach user info to request
    next()
  })
}

export default authenticateJWT
