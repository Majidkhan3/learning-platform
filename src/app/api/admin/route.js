import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../../../model/Admin'
import connectToDatabase from '@/lib/db'
export async function POST(req) {
  try {
    await connectToDatabase()
    console.log('Connected to database')

    const { username, password } = await req.json() // Use username instead of email
    console.log('username', username)
    console.log('pass', password)
    const user = await Admin.findOne({ username }) // Query by username
    console.log('User found:', user)

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    console.log('Password is valid')

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '4d',
    })
    console.log('Token generated:', token)

    return new Response(JSON.stringify({ token, user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Error logging in' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
