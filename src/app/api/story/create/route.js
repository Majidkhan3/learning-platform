import { randomUUID } from 'crypto'
import Story from '@/model/Story'
import Word from '@/model/Word'
import connectToDatabase from '@/lib/db'
import { NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/verifyToken'
import { Mistral } from '@mistralai/mistralai'

// --------------------
// MISTRAL SETUP (ONLY ADDITION)
// --------------------
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest'

const mistral = MISTRAL_API_KEY
  ? new Mistral({ apiKey: MISTRAL_API_KEY })
  : null

// --------------------
// GET STORIES
// --------------------
export async function GET(req) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  await connectToDatabase()

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId is required.' }), { status: 400 })
  }

  try {
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

// --------------------
// STORY GENERATION (MODEL CHANGED ONLY)
// --------------------
async function generateStoryWithClaude(words, theme) {
  try {
    let selectedWords = words
    if (words.length > 75) {
      selectedWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 75)
    }

    const wordsList = selectedWords.map((word) => word.word)

    const wordsGroup1 = wordsList.slice(0, Math.ceil(wordsList.length / 2))
    const wordsGroup2 = wordsList.slice(Math.ceil(wordsList.length / 2))

    const group1Text = wordsGroup1.join(', ')
    const group2Text = wordsGroup2.join(', ')

    if (!mistral) {
      throw new Error('Mistral API key is missing')
    }

    const prompt = `
      Por favor, crea exactamente 2 diálogos narrativos, naturales y coherentes en español, que simulen una conversación real entre dos personas.

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

    const result = await mistral.chat.complete({
      model: MISTRAL_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const storyText =
      result?.choices?.[0]?.message?.content ||
      result?.output_text ||
      ''

    if (!storyText) {
      throw new Error('Mistral API response empty')
    }

    return { storyText, wordsUsed: wordsList }
  } catch (error) {
    console.error('Error generating story:', error)
    throw error
  }
}

// --------------------
// POST CREATE STORY
// --------------------
export async function POST(req) {
  const auth = await verifyToken(req)

  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  await connectToDatabase()

  const { theme, selectedTags, rating, userId, words } = await req.json()

  if (!theme || !userId || !words || words.length === 0) {
    return new Response(JSON.stringify({ error: 'Title, theme, userId, and words are required.' }), { status: 400 })
  }

  try {
    const { storyText, wordsUsed } = await generateStoryWithClaude(words, theme)

    // --------------------
    // TITLE GENERATION (MODEL CHANGED ONLY)
    // --------------------
    let title = 'Historia'

    try {
      const titlePrompt = generateStoryTitlePrompt(storyText)

      const titleResult = await mistral.chat.complete({
        model: MISTRAL_MODEL,
        messages: [{ role: 'user', content: titlePrompt }],
        temperature: 0.7,
      })

      const raw =
        titleResult?.choices?.[0]?.message?.content ||
        titleResult?.output_text ||
        ''

      title = raw.trim().replace(/["'.]/g, '').split(' ').slice(0, 4).join(' ')
    } catch (error) {
      console.error('Title generation failed:', error)
    }

    const storyId = randomUUID()
    const creationDate = new Date().toISOString()

    const newStory = new Story({
      storyId,
      userId,
      title,
      theme,
      tags: selectedTags,
      rating,
      creationDate,
      wordsUsed,
      storyText,
    })

    await newStory.save()

    return new Response(JSON.stringify({ message: 'Story created successfully!', storyId }), { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}

// --------------------
// TITLE PROMPT (UNCHANGED)
// --------------------
function generateStoryTitlePrompt(storyText) {
  return `
Basándote en la historia siguiente (que contiene exactamente dos diálogos en español), genera un título corto de 3 a 4 palabras máximo que resuma el tema principal del contenido.

Historia:
${storyText.substring(0, 800)}...

Responde únicamente con el título, sin comillas ni puntos.
`
}
