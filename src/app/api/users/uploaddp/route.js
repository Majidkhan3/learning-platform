import { writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import User from '@/model/User'
import { v4 as uuidv4 } from 'uuid'
import { mkdirSync, existsSync } from 'fs'

export async function POST(req) {
  try {
    await connectToDatabase()

    const formData = await req.formData()
    const file = formData.get('image')
    const userId = formData.get('userId')

    if (!file || !userId) {
      return NextResponse.json({ message: 'Missing file or userId' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

    const fileName = `${uuidv4()}-${file.name}`
    const filePath = path.join(uploadDir, fileName)
    const fileUrl = `/uploads/${fileName}`

    await writeFile(filePath, buffer)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: fileUrl },
      { new: true }
    ).select('-password')

    return NextResponse.json({ imageUrl: fileUrl, user: updatedUser }, { status: 200 })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
