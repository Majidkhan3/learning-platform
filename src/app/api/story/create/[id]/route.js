import connectToDatabase from '@/lib/db'
import Story from '@/model/Story' // Import the Story schema

export async function GET(req, { params }) {
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
