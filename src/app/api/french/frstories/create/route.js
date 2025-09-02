import { randomUUID } from 'crypto'
import axios from 'axios' // For making HTTP requests
import connectToDatabase from '@/lib/db'
import Frstories from '../../../../../model/Frstories'
import { verifyToken } from '../../../../../lib/verifyToken'
import { NextResponse } from 'next/server'

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
    const stories = await Frstories.find({ userId })

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
      Merci de créer exactement 2 dialogues narratifs, naturels et cohérents en français, qui simulent une conversation réelle entre deux personnes.

      INSTRUCTIONS IMPORTANTES :
      1. Utilisez exclusivement les étiquettes 'Personne A :' et 'Personne B :' (n’utilisez pas de noms propres).
      2. Chaque intervention doit comporter 4 à 5 phrases complètes, descriptives et naturelles, sans se limiter à un nombre fixe de mots par phrase.
      3. Chaque phrase doit se terminer par un point ou un autre signe de ponctuation approprié.
      4. N’écrivez pas de phrases incomplètes ni n’utilisez 'etc.' ou '...'.
      5. Incorporez de façon cohérente le thème et les mots-clés obligatoires suivants, mais utilisez aussi d’autres mots qui enrichissent la narration et permettent des transitions logiques entre les idées.
      6. Si les mots-clés sont des verbes, conjuguez-les correctement selon le contexte, et ajustez le genre des noms ou adjectifs pour que la conversation soit naturelle.
      7. Le dialogue doit ressembler à une conversation réelle : incluez questions, réponses, commentaires spontanés, interjections et transitions naturelles.
      8. Le thème est : ${theme}

      Pour le PREMIER dialogue, intégrez obligatoirement les mots-clés suivants : ${group1Text}
      Pour le DEUXIÈME dialogue, intégrez obligatoirement les mots-clés suivants : ${group2Text}

      FORMAT EXACT À SUIVRE :

      Dialogue 1 :
      Personne A : [Phrase 1. Phrase 2. Phrase 3. Phrase 4.]
      Personne B : [Phrase 1. Phrase 2. Phrase 3. Phrase 4.]
      FIN DIALOGUE 1

      Dialogue 2 :
      Personne A : [Phrase 1. Phrase 2. Phrase 3. Phrase 4.]
      Personne B : [Phrase 1. Phrase 2. Phrase 3. Phrase 4.]
      FIN DIALOGUE 2

      Assurez-vous que les deux dialogues soient complets, cohérents, ressemblent à une vraie conversation et ne soient pas coupés.
    `

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
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
    // Generate title using Claude
    let title = 'Stories'

    try {
      const titleRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY || '',
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 50,
          temperature: 0.7,
          messages: [
            {
              role: 'user',
              content: generateStoryTitlePrompt(storyText),
            },
          ],
        }),
      })

      const titleData = await titleRes.json()

      if (titleRes.ok && titleData.content) {
        const raw = Array.isArray(titleData.content) ? titleData.content[0]?.text : titleData.completion

        title = raw?.trim().replace(/["'.]/g, '').split(' ').slice(0, 4).join(' ')
      } else {
        console.error('Claude title generation failed:', titleData)
      }
    } catch (error) {
      console.error('Error calling Claude:', error)
    }

    // Create a new story document
    const storyId = randomUUID()
    const creationDate = new Date().toISOString()

    const newStory = new Frstories({
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

    // Save the story to the database
    await newStory.save()

    return new Response(JSON.stringify({ message: 'Story created successfully!', storyId }), { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}
function generateStoryTitlePrompt(storyText) {
  return `
Sur la base de l'histoire suivante (qui contient exactement deux dialogues en french), générez un titre court de 3 à 4 mots maximum qui résume le sujet principal du contenu.

Stories:
${storyText.substring(0, 800)}...

Veuillez répondre simplement avec le titre, sans guillemets ni points. Le titre doit être en french et capturer l'essence narrative de l'histoire.
`
}
