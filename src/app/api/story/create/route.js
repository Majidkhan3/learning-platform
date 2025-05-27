import { randomUUID } from 'crypto'
import Story from '@/model/Story' // Import the Story schema
import Word from '@/model/Word' // Import the Word schema (for filtered words)
import axios from 'axios' // For making HTTP requests
import connectToDatabase from '@/lib/db'
import { verifyToken } from '../../../../lib/verifyToken'
export async function GET(req) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  await connectToDatabase() // Ensure the database connection is established

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') // Extract userId from query parameters

  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId is required.' }), { status: 400 })
  }

  try {
    // Fetch stories by userId
    const stories = await Story.find({ userId })

    if (!stories || stories.length === 0) {
      return new Response(JSON.stringify({ message: 'No stories found for this user.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ stories }), { status: 200 })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
async function generateStoryWithClaude(words, theme) {
  try {
    // Limit the number of words to use
    let selectedWords = words
    if (words.length > 75) {
      selectedWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 75)
    }

    // Extract words as plain text
    const wordsList = selectedWords.map((word) => word.word)

    // Split words into two groups for the two dialogues
    const wordsGroup1 = wordsList.slice(0, Math.ceil(wordsList.length / 2))
    const wordsGroup2 = wordsList.slice(Math.ceil(wordsList.length / 2))

    const group1Text = wordsGroup1.join(', ')
    const group2Text = wordsGroup2.join(', ')

    // Use Claude API to generate the story
    const apiKey = process.env.CLAUDE_API_KEY
    if (!apiKey) {
      throw new Error('Claude API key is missing')
    }

    const prompt = `
      Por favor, crea exactamente 2 diálogos narrativos, naturales y coherentes en español, que simulen una conversación real entre dos personas.

      INSTRUCCIONES IMPORTANTES:
      1. Utiliza exclusivamente las etiquetas 'Personne A:' y 'Personne B:' (no uses nombres propios).
      2. Cada intervención debe consistir en 4 a 5 frases completas, descriptivas y naturales, sin limitarse a un número fijo de palabras por frase.
      3. Cada frase debe terminar con un punto u otro signo de puntuación apropiado.
      4. No escribas frases incompletas ni uses 'etc.' o '...'.
      5. Incorpora de forma coherente el tema y las siguientes palabras clave obligatorias, pero utiliza también otras palabras que enriquezcan la narrativa y permitan transiciones lógicas entre las ideas.
      6. Si las palabras clave son verbos, conjúgalos correctamente según el contexto, y ajusta el género de los sustantivos o adjetivos para que la conversación sea natural.
      7. El diálogo debe parecer una conversación real: incluye preguntas, respuestas, comentarios espontáneos, interjecciones y transiciones naturales.
      8. El tema es: ${theme}

      Para el PRIMER diálogo, integra obligatoriamente las siguientes palabras clave: ${group1Text}
      Para el SEGUNDO diálogo, integra obligatoriamente las siguientes palabras clave: ${group2Text}

      FORMATO EXACTO A SEGUIR:

      Dialogue 1:
      Personne A: [Frase 1. Frase 2. Frase 3. Frase 4.]
      Personne B: [Frase 1. Frase 2. Frase 3. Frase 4.]
      FIN DIALOGUE 1

      Dialogue 2:
      Personne A: [Frase 1. Frase 2. Frase 3. Frase 4.]
      Personne B: [Frase 1. Frase 2. Frase 3. Frase 4.]
      FIN DIALOGUE 2

      Asegúrate de que ambos diálogos estén completos, sean coherentes, parezcan una conversación real y no se corten.
    `

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      },
    )

    // Log the full response for debugging
    console.log('Claude API Response:', response.data)

    // Check and parse the response structure
    if (response.status === 200 && response.data.content && Array.isArray(response.data.content)) {
      const storyText = response.data.content[0]?.text // Extract the text from the first object in the content array
      if (!storyText) {
        throw new Error('Claude API response does not contain valid story text.')
      }
      return { storyText, wordsUsed: wordsList }
    } else {
      throw new Error(`Unexpected Claude API response structure: ${JSON.stringify(response.data)}`)
    }
  } catch (error) {
    console.error('Error generating story:', error)
    throw error
  }
}

export async function POST(req, res) {
  const auth = await verifyToken(req)
  
    if (!auth.valid) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
    }
  await connectToDatabase() // Ensure you have a function to connect to your database
  const { theme, selectedTags, rating, userId, words } = await req.json()

  if (!theme || !userId || !words || words.length === 0) {
    return new Response(JSON.stringify({ error: 'Title, theme, userId, and words are required.' }), { status: 400 })
  }

  try {
    // Generate the story using Claude API
    const { storyText, wordsUsed } = await generateStoryWithClaude(words, theme)

    // Create a new story document
    const storyId = randomUUID()
    const creationDate = new Date().toISOString()

    const newStory = new Story({
      storyId,
      userId,
      // title,
      theme,
      tags: selectedTags,
      rating,
      creationDate,
      wordsUsed,
      storyText,
    })

    // Save the story to the database
    await newStory.save()

    return new Response(JSON.stringify({ message: 'Story created successfully!', storyId }), { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
