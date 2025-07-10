import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../../model/User'
import connectToDatabase from '@/lib/db'
export async function POST(req) {
  try {
    await connectToDatabase()
    console.log('Connected to database')
    const { email, password } = await req.json()
    const user = await User.findOne({ email })
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
