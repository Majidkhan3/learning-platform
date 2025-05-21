import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
import Pordialogue from '../../../../model/Pordialogue'
export async function GET(req) {
  try {
    // Connect to the database
    await connectToDatabase()

    // Extract user ID from query parameters
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 })
    }
 
    // Fetch dialogues for the specific user
    const dialogues = await Pordialogue.find({ userId }).sort({ createdAt: -1 })

    // Return the dialogues as a JSON response
    return NextResponse.json({ dialogues }, { status: 200 })
  } catch (error) {
    console.error('Error fetching dialogues:', error)
    return NextResponse.json({ error: 'Failed to fetch dialogues' }, { status: 500 })
  }
}
