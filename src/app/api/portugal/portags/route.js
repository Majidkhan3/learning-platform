import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Portag from '../../../../model/Portag'
import Porword from '../../../../model/Porword'
import { verifyToken } from '../../../../lib/verifyToken'

export async function POST(req) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  try {
    await connectToDatabase()

    const body = await req.json()
    const { name, userId } = body

    if (!name || !userId) {
      return NextResponse.json({ error: 'Name and userId are required' }, { status: 400 })
    }

    // Check if the tag already exists for the user
    const existingTag = await Portag.findOne({ name, userId })
    if (existingTag) {
      return NextResponse.json({ error: 'Tag already exists' }, { status: 400 })
    }

    // Create a new tag
    const newTag = new Portag({ name, userId })
    await newTag.save()

    return NextResponse.json({ success: true, tag: newTag }, { status: 201 })
  } catch (error) {
    console.error('Error adding tag:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 })
    }

    const tags = await Portag.find({ userId })
    return NextResponse.json({ success: true, tags }, { status: 200 })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
export async function DELETE(req) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')
    const userId = searchParams.get('userId')

    if (!name || !userId) {
      return NextResponse.json({ error: 'Name and userId are required' }, { status: 400 })
    }

    // Delete the tag
    const deletedTag = await Portag.findOneAndDelete({ name, userId })
        await Porword.updateMany(
  { userId, tags: name },
  { $pull: { tags: name } }
)

    if (!deletedTag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Tag deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
