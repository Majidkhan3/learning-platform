import { randomUUID } from 'crypto'
import connectToDatabase from '@/lib/db'
import Frstories from '../../../../../model/Frstories'
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
    const stories = await Frstories.find({ userId })
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
Sur la base de l'histoire suivante (qui contient exactement deux dialogues en français), générez un titre court de 3 à 4 mots maximum qui résume le sujet principal.

Story:
${storyText.substring(0, 800)}...

Répondez uniquement avec le titre, sans guillemets ni points.
`
}
