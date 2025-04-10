// pages/api/dialogues/[id].js
import Dialogue from '@/model/Dialogue'
import { NextResponse } from 'next/server'
export async function GET(req, { params }) {
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
