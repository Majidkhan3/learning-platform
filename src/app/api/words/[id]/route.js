import { NextResponse } from 'next/server'
import Word from '../../../../model/Word'
import connectToDatabase from '../../../../lib/db'

export async function PUT(req, { params }) {
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters
    const body = await req.json() // Parse the request body

    // Validate the request body
    const { word, tags, summary, image, note } = body
    if (!word) {
      return NextResponse.json({ error: "The 'word' parameter is required." }, { status: 400 })
    }

    // Find the word by ID and update it
    const updatedWord = await Word.findByIdAndUpdate(
      id,
      { word, tags, summary, image, note },
      { new: true }, // Return the updated document
    )

    if (!updatedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word updated successfully!', word: updatedWord }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters

    // Find the word by ID
    const word = await Word.findById(id)

    if (!word) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, word }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase()

    const { id } = params // Get the ID from the route parameters

    // Find the word by ID and delete it
    const deletedWord = await Word.findByIdAndDelete(id)

    if (!deletedWord) {
      return NextResponse.json({ error: 'Word not found.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Word deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
