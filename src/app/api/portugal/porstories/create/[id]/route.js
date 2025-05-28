import connectToDatabase from '@/lib/db' // Import the Porstory  schema
import Porstories from '../../../../../../model/Porstories'
import { verifyToken } from '../../../../../../lib/verifyToken';



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
    const story = await Porstories.findOne({ storyId })

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
    const deletedStory = await Porstories.findOneAndDelete({ storyId })

    if (!deletedStory) {
      return new Response(JSON.stringify({ message: 'Story not found.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'Story deleted successfully.' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
