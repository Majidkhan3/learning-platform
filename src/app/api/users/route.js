import connectToDatabase from '@/lib/db'
import User from '../../../model/User'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

// GET - Fetch all users
export async function GET() {
  try {
    await connectToDatabase()
    const users = await User.find({})
    .select('email  pseudo createdAt languages')
    .select('-password').sort({ createdAt: -1 })
    console.log("Fetched users:", users);
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}

// POST - Create new user
export async function POST(req) {
  try {
    await connectToDatabase()
    const body = await req.json()
    console.log('Received request body:', body)
    const { email, password, dentist, address, pseudo, languages = [] } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      pseudo,
      languages, 
    })

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = newUser.toObject()
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}
