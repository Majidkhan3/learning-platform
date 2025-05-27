import jwt from 'jsonwebtoken'

export async function verifyToken(req) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'No token provided' }
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { valid: true, userId: decoded.userId }
  } catch (err) {
    return { valid: false, error: 'Invalid or expired token' }
  }
}
