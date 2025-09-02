import { randomUUID } from 'crypto'
import Enword from '@/model/Enword' // Import the Word schema (for filtered words)
import axios from 'axios' // For making HTTP requests
import connectToDatabase from '@/lib/db'
import Enstories from '../../../../model/Enstories'
import { verifyToken } from '../../../../lib/verifyToken'
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
    const stories = await Enstories.find({ userId })

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
      Please create exactly 2 natural and coherent narrative dialogues in English, simulating a real conversation between two people.

IMPORTANT INSTRUCTIONS:
1. Use only the labels 'Person A:' and 'Person B:' (do not use real names).
2. Each turn should consist of 4 to 5 complete, descriptive, and natural sentences, not limited to a fixed number of words per sentence.
3. Each sentence must end with a period or other appropriate punctuation.
4. Do not write incomplete sentences or use “etc.” or “...”.
5. Naturally incorporate the theme and the following mandatory vocabulary words, but also use other words to enrich the narrative and allow logical transitions between ideas.
6. If the vocabulary words are verbs, conjugate them correctly according to the context, and adjust nouns or adjectives for natural grammar and tone.
7. The dialogues should sound like real conversations: include questions, answers, spontaneous comments, interjections, and smooth transitions.
8. The theme is: ${theme}

For the FIRST dialogue, you must include the following vocabulary words: ${group1Text}
For the SECOND dialogue, you must include the following vocabulary words: ${group2Text}

EXACT FORMAT TO FOLLOW:

Dialogue 1:
Person A: [Sentence 1. Sentence 2. Sentence 3. Sentence 4.]
Person B: [Sentence 1. Sentence 2. Sentence 3. Sentence 4.]
END DIALOGUE 1

Dialogue 2:
Person A: [Sentence 1. Sentence 2. Sentence 3. Sentence 4.]
Person B: [Sentence 1. Sentence 2. Sentence 3. Sentence 4.]
END DIALOGUE 2

Make sure both dialogues are complete, coherent, sound like a real conversation, and are not cut off.
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

    const newStory = new Enstories({
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
Based on the following story (which contains exactly two dialogues in English), generate a short title of 3 to 4 words maximum that summarizes the main topic of the content.

Stories:
${storyText.substring(0, 800)}...

Please respond with only the title, without quotation marks or periods. The title must be in English and capture the narrative essence of the story.
`
}
