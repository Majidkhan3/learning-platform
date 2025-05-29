// pages/api/dialogues/[id].js
import Frdialogue from '../../../../../model/Frdialogue'
import { NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/verifyToken'
export async function GET(req, { params }) {
  const auth = await verifyToken(req)
      
        if (!auth.valid) {
          return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
        }
  try {
    const { id } = params
    console.log('Fetching dialogue with ID:', id)
    const dialogue = await Frdialogue.findById(id)
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

    const deletedDialogue = await Frdialogue.findByIdAndDelete(id)

    if (!deletedDialogue) {
      return new NextResponse(JSON.stringify({ error: 'Dialogue not found' }), { status: 404 })
    }

    return new NextResponse(JSON.stringify({ message: 'Dialogue deleted successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting dialogue:', error)
    return new NextResponse(JSON.stringify({ error: 'Error deleting dialogue' }), { status: 500 })
  }
}
