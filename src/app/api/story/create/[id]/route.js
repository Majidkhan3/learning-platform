import connectToDatabase from '@/lib/db'
import Story from '@/model/Story' // Import the Story schema
import { verifyToken } from '../../../../../lib/verifyToken'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  const auth = await verifyToken(req)
    
      if (!auth.valid) {
        return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
      }
  
  await connectToDatabase() // Ensure the database connection is established

  const { id: storyId } = params // Extract storyId from the dynamic route

  if (!storyId) {
    return new Response(JSON.stringify({ error: 'storyId is required.' }), { status: 400 })
  }

  try {
    // Fetch the story by storyId
    const story = await Story.findOne({ storyId })

    if (!story) {
      return new Response(JSON.stringify({ message: 'Story not found.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ story }), { status: 200 })
  } catch (error) {
    console.error('Error fetching story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req)
    
      if (!auth.valid) {
        return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
      }
  await connectToDatabase()

  const { id: storyId } = params

  if (!storyId) {
    return new Response(JSON.stringify({ error: 'storyId is required.' }), { status: 400 })
  }

  try {
    const deletedStory = await Story.findOneAndDelete({ storyId })

    if (!deletedStory) {
      return new Response(JSON.stringify({ message: 'Story not found.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'Story deleted successfully.' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id: storyId } = params // ✅ Correct param name
    const body = await req.json()
    const { title } = body

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Title is required and must be a non-empty string' }, { status: 400 })
    }

    const cleanedTitle = title.trim().split(' ').slice(0, 4).join(' ').substring(0, 50)

    const updatedStory = await Story.findOneAndUpdate(
      { storyId },
      { title: cleanedTitle },
      { new: true, runValidators: true }
    )

    if (!updatedStory) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Title updated successfully',
      story: updatedStory,
    }, { status: 200 })
  } catch (error) {
    console.error('Error updating story title:', error)
    return NextResponse.json({ error: 'Error updating story title' }, { status: 500 })
  }
}
