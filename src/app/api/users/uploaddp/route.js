import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import User from '@/model/User'

export async function POST(req) {
  try {
    await connectToDatabase()
    const { image, userId } = await req.json()

    if (!image || !userId) {
      return NextResponse.json({ message: 'Missing image or userId' }, { status: 400 })
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image }, // image is a base64 string
      { new: true }
    ).select('-password')

    return NextResponse.json(
      { imageUrl: image, user: updatedUser },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
