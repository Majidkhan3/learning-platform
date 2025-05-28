import { NextResponse } from 'next/server'
import Dialogue from '@/model/Dialogue'
import connectToDatabase from '@/lib/db'
import { verifyToken } from '../../../lib/verifyToken'


export async function GET(req) {
   const auth = await verifyToken(req)
      
        if (!auth.valid) {
          return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
        }
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
    const dialogues = await Dialogue.find({ userId }).sort({ createdAt: -1 })

    // Return the dialogues as a JSON response
    return NextResponse.json({ dialogues }, { status: 200 })
  } catch (error) {
    console.error('Error fetching dialogues:', error)
    return NextResponse.json({ error: 'Failed to fetch dialogues' }, { status: 500 })
  }
}
