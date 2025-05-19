import connectToDatabase from '@/lib/db'
import Porstory  from '@/model/Porstory' // Import the Porstory  schema

export async function GET(req, { params }) {
  await connectToDatabase() // Ensure the database connection is established

  const { id: storyId } = params // Extract storyId from the dynamic route

  if (!storyId) {
    return new Response(JSON.stringify({ error: 'storyId is required.' }), { status: 400 })
  }

  try {
    // Fetch the story by storyId
    const story = await Porstory .findOne({ storyId })

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
  await connectToDatabase()

  const { id: storyId } = params

  if (!storyId) {
    return new Response(JSON.stringify({ error: 'storyId is required.' }), { status: 400 })
  }

  try {
    const deletedStory = await Porstory .findOneAndDelete({ storyId })

    if (!deletedStory) {
      return new Response(JSON.stringify({ message: 'Story not found.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ message: 'Story deleted successfully.' }), { status: 200 })
  } catch (error) {
    console.error('Error deleting story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
