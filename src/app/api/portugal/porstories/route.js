import { randomUUID } from 'crypto'
import Porword from '@/model/Porword' // Import the Word schema (for filtered words)
import axios from 'axios' // For making HTTP requests
import connectToDatabase from '@/lib/db'
import Porstories from '../../../../model/Porstories'
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
    const stories = await Porstory.find({ userId })

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
Com base na história a seguir (que contém exatamente dois diálogos em portugaise), gere um título curto de 3 a 4 palavras no máximo que resuma o tópico principal do conteúdo.

Stories:
${storyText.substring(0, 800)}...

Responda apenas com o título, sem aspas ou pontos. O título deve ser em portugaise e capturar a essência narrativa da história.
`
}
