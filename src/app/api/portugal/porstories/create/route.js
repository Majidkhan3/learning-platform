import { randomUUID } from 'crypto'
import Porword from '@/model/Porword'
import connectToDatabase from '@/lib/db'
import Porstories from '../../../../../model/Porstories'
import { verifyToken } from '../../../../../lib/verifyToken'
import { NextResponse } from 'next/server'
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
    const stories = await Porstories.find({ userId })

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
     Por favor, crie exatamente 2 diálogos narrativos, naturais e coerentes em português, que simulem uma conversa real entre duas pessoas.

INSTRUÇÕES IMPORTANTES:
1. Utilize exclusivamente as etiquetas 'Pessoa A:' e 'Pessoa B:' (não use nomes próprios).
2. Cada intervenção deve conter de 4 a 5 frases completas, descritivas e naturais, sem se limitar a um número fixo de palavras por frase.
3. Cada frase deve terminar com um ponto ou outro sinal de pontuação apropriado.
4. Não escreva frases incompletas nem use 'etc.' ou '...'.
5. Incorpore de forma coerente o tema e as seguintes palavras-chave obrigatórias, mas utilize também outras palavras que enriqueçam a narrativa e permitam transições lógicas entre as ideias.
6. Se as palavras-chave forem verbos, conjugue-os corretamente de acordo com o contexto e ajuste o gênero dos substantivos ou adjetivos para que a conversa soe natural.
7. O diálogo deve parecer uma conversa real: inclua perguntas, respostas, comentários espontâneos, interjeições e transições naturais.
8. O tema é: ${theme}

Para o PRIMEIRO diálogo, integre obrigatoriamente as seguintes palavras-chave: ${group1Text}
Para o SEGUNDO diálogo, integre obrigatoriamente as seguintes palavras-chave: ${group2Text}

FORMATO EXATO A SEGUIR:

Diálogo 1:
Pessoa A: [Frase 1. Frase 2. Frase 3. Frase 4.]
Pessoa B: [Frase 1. Frase 2. Frase 3. Frase 4.]
FIM DO DIÁLOGO 1

Diálogo 2:
Pessoa A: [Frase 1. Frase 2. Frase 3. Frase 4.]
Pessoa B: [Frase 1. Frase 2. Frase 3. Frase 4.]
FIM DO DIÁLOGO 2

Certifique-se de que ambos os diálogos estejam completos, sejam coerentes, pareçam uma conversa real e não sejam cortados.
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
      throw new Error('Mistral response empty')
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
    let title = 'Stories'

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

    const newStory = new Porstories({
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
Com base na história a seguir (que contém exatamente dois diálogos em português), gere um título curto de 3 a 4 palavras no máximo que resuma o tópico principal do conteúdo.

Stories:
${storyText.substring(0, 800)}...

Responda apenas com o título, sem aspas ou pontos.
`
}
