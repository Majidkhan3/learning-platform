// pages/api/dialogues/[id].js
import Dialogue from '@/model/Dialogue'
import { NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/verifyToken'

export async function GET(req, { params }) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  try {
    const { id } = params
    console.log('Fetching dialogue with ID:', id)
    const dialogue = await Dialogue.findById(id)
    if (!dialogue) {
      return new NextResponse(JSON.stringify({ error: 'Dialogue not found' }), { status: 404 })
    }
    return new NextResponse(JSON.stringify(dialogue), { status: 200 })
  } catch (error) {
    console.error('Error fetching dialogue:', error)
    return new NextResponse(JSON.stringify({ error: 'Error fetching dialogue' }), { status: 500 })
  }
}
export async function DELETE(req, { params }) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  try {
    const { id } = params
    console.log('Deleting dialogue with ID:', id)

    const deletedDialogue = await Dialogue.findByIdAndDelete(id)

    if (!deletedDialogue) {
      return new NextResponse(JSON.stringify({ error: 'Dialogue not found' }), { status: 404 })
    }

    return new NextResponse(JSON.stringify({ message: 'Dialogue deleted successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting dialogue:', error)
    return new NextResponse(JSON.stringify({ error: 'Error deleting dialogue' }), { status: 500 })
  }
}
export async function PUT(req, { params }) {
  const auth = await verifyToken(req)
  
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id } = params
    const body = await req.json()
    const { title } = body

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Title is required and must be a non-empty string' }, { status: 400 })
    }

    // Limit title length to 50 characters and 4 words
    const cleanedTitle = title
      .trim()
      .split(' ')
      .slice(0, 4)
      .join(' ')
      .substring(0, 50)

    const updatedDialogue = await Dialogue.findByIdAndUpdate(
      id,
      { title: cleanedTitle },
      { new: true, runValidators: true }
    )

    if (!updatedDialogue) {
      return NextResponse.json({ error: 'Dialogue not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      message: 'Title updated successfully', 
      dialogue: updatedDialogue 
    }, { status: 200 })
  } catch (error) {
    console.error('Error updating dialogue title:', error)
    return NextResponse.json({ error: 'Error updating dialogue title' }, { status: 500 })
  }
}
