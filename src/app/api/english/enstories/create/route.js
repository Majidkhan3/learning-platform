import { randomUUID } from 'crypto'
import connectToDatabase from '@/lib/db'
import Enstories from '../../../../../model/Enstories'
import { verifyToken } from '../../../../../lib/verifyToken'
import { NextResponse } from 'next/server'
import { Mistral } from '@mistralai/mistralai'

// --------------------
// MISTRAL SETUP
// --------------------
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || 'mistral-medium-latest'

const mistral = MISTRAL_API_KEY ? new Mistral({ apiKey: MISTRAL_API_KEY }) : null

// --------------------
// GET STORIES
// --------------------
export async function GET(req) {
  const auth = await verifyToken(req)
  if (!auth.valid) return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })

  await connectToDatabase()
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return new Response(JSON.stringify({ error: 'userId is required.' }), { status: 400 })

  try {
    const stories = await Enstories.find({ userId })
    if (!stories || stories.length === 0) return new Response(JSON.stringify({ message: 'No stories found for this user.' }), { status: 404 })

    return new Response(JSON.stringify({ stories }), { status: 200 })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}

// --------------------
// STORY GENERATION
// --------------------
async function generateStoryWithMistral(words, theme) {
  try {
    let selectedWords = words.length > 75 ? [...words].sort(() => 0.5 - Math.random()).slice(0, 75) : words
    const wordsList = selectedWords.map(w => w.word)

    const wordsGroup1 = wordsList.slice(0, Math.ceil(wordsList.length / 2))
    const wordsGroup2 = wordsList.slice(Math.ceil(wordsList.length / 2))
    const group1Text = wordsGroup1.join(', ')
    const group2Text = wordsGroup2.join(', ')

    if (!mistral) throw new Error('Mistral API key is missing')

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

    const result = await mistral.chat.complete({
      model: MISTRAL_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const storyText = result?.choices?.[0]?.message?.content || result?.output_text || ''
    if (!storyText) throw new Error('Mistral response empty')

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
  if (!auth.valid) return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })

  await connectToDatabase()
  const { theme, selectedTags, rating, userId, words } = await req.json()
  if (!theme || !userId || !words || words.length === 0) {
    return new Response(JSON.stringify({ error: 'Theme, userId, and words are required.' }), { status: 400 })
  }

  try {
    const { storyText, wordsUsed } = await generateStoryWithMistral(words, theme)

    // TITLE GENERATION
    let title = 'Stories'
    try {
      const titlePrompt = generateStoryTitlePrompt(storyText)
      const titleResult = await mistral.chat.complete({
        model: MISTRAL_MODEL,
        messages: [{ role: 'user', content: titlePrompt }],
        temperature: 0.7,
      })
      const raw = titleResult?.choices?.[0]?.message?.content || titleResult?.output_text || ''
      title = raw.trim().replace(/["'.]/g, '').split(' ').slice(0, 4).join(' ')
    } catch (error) {
      console.error('Title generation failed:', error)
    }

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

    await newStory.save()
    return new Response(JSON.stringify({ message: 'Story created successfully!', storyId }), { status: 201 })
  } catch (error) {
    console.error('Error creating story:', error)
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
  }
}

// --------------------
// TITLE PROMPT
// --------------------
function generateStoryTitlePrompt(storyText) {
  return `
Based on the following story (which contains exactly two dialogues in English), generate a short title of 3 to 4 words maximum that summarizes the main topic.

Story:
${storyText.substring(0, 800)}...

Respond only with the title, without quotes or periods.
`
}
