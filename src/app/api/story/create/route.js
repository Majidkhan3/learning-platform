import { randomUUID } from 'crypto'
import Story from '@/model/Story' // Import the Story schema
import Word from '@/model/Word' // Import the Word schema (for filtered words)
import axios from 'axios' // For making HTTP requests
import connectToDatabase from '@/lib/db'

// // Helper function to get filtered words
// async function getFilteredWords(tags = [], rating = null) {
//   try {
//     const query = {}
//     if (tags.length > 0) {
//       query.tags = { $in: tags.map((tag) => new RegExp(`^${tag}$`, 'i')) } // Case-insensitive matching
//     }
//     if (rating !== null) {
//       query.rating = { $gte: rating } // Matches words with a rating greater than or equal to the provided value
//     }
//     console.log('Query for filtered words:', query)
//     const words = await Word.find(query)
//     console.log('Filtered words:', words)
//     return words
//   } catch (error) {
//     console.error('Error fetching filtered words:', error)
//     return []
//   }
// }

// // Helper function to get word usage history
// async function getWordsUsageHistory(limit = 10) {
//   try {
//     const recentStories = await Story.find().sort({ creationDate: -1 }).limit(limit).select('wordsUsed')

//     const wordUsage = {}
//     recentStories.forEach((story) => {
//       story.wordsUsed.forEach((word) => {
//         wordUsage[word] = (wordUsage[word] || 0) + 1
//       })
//     })

//     return wordUsage
//   } catch (error) {
//     console.error('Error fetching word usage history:', error)
//     return {}
//   }
// }

// // Helper function to get rotation candidates
// async function getRotationCandidates() {
//   try {
//     const recentStories = await Story.find().sort({ creationDate: -1 }).limit(5).select('wordsUsed')

//     if (recentStories.length < 3) {
//       return []
//     }

//     const storyWords = recentStories.map((story) => story.wordsUsed)
//     const rotationCandidates = []

//     storyWords[0].forEach((word) => {
//       let consecutiveCount = 1
//       for (let i = 1; i < Math.min(3, storyWords.length); i++) {
//         if (storyWords[i].includes(word)) {
//           consecutiveCount++
//         } else {
//           break
//         }
//       }
//       if (consecutiveCount >= 3) {
//         rotationCandidates.push(word)
//       }
//     })

//     return rotationCandidates
//   } catch (error) {
//     console.error('Error fetching rotation candidates:', error)
//     return []
//   }
// }

// // Helper function to generate a story
// async function generateStory(words, theme) {
//   const selectedWords = words.length > 75 ? words.sort(() => 0.5 - Math.random()).slice(0, 75) : words

//   const wordsList = selectedWords.map((word) => word.word)
//   const wordUsage = await getWordsUsageHistory(10)

//   const prioritizedWords = wordsList.sort((a, b) => (wordUsage[a] || 0) - (wordUsage[b] || 0))

//   const neverUsed = prioritizedWords.filter((w) => !wordUsage[w])
//   const rarelyUsed = prioritizedWords.filter((w) => wordUsage[w] < 2)
//   const otherWords = prioritizedWords.filter((w) => !neverUsed.includes(w) && !rarelyUsed.includes(w))

//   const finalWords = [
//     ...neverUsed.sort(() => 0.5 - Math.random()),
//     ...rarelyUsed.sort(() => 0.5 - Math.random()),
//     ...otherWords.sort(() => 0.5 - Math.random()),
//   ]

//   const rotationCandidates = await getRotationCandidates()
//   const filteredWords = finalWords.filter((w) => !rotationCandidates.includes(w))
//   const finalWordList = [...filteredWords, ...rotationCandidates.slice(-10)].slice(0, 75)

//   const wordsGroup1 = finalWordList.slice(0, Math.floor(finalWordList.length / 2))
//   const wordsGroup2 = finalWordList.slice(Math.floor(finalWordList.length / 2))

//   return {
//     prompt: `
//       Por favor, crea exactamente 2 diálogos narrativos, naturales y coherentes en español, que simulen una conversación real entre dos personas.
//       Tema: ${theme}
//       Palabras clave para el primer diálogo: ${wordsGroup1.join(', ')}
//       Palabras clave para el segundo diálogo: ${wordsGroup2.join(', ')}
//     `,
//     finalWords: finalWordList,
//   }
// }

// // Function to call Claude API
async function callClaudeAPI(prompt) {
  try {
    const apiKey = process.env.CLAUDE_API_KEY // Ensure this is set in your environment variables
    if (!apiKey) {
      throw new Error('Claude API key is missing.')
    }

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

    if (response.status === 200 && response.data) {
      return response.data.messages[0].content // Adjust based on Claude's response structure
    } else {
      throw new Error(`Claude API error: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw new Error('Failed to generate story using Claude API.')
  }
}

// Named export for the POST method
// export async function POST(req, res) {
//   await connectToDatabase() // Ensure you have a function to connect to your database
//   const { title, theme, selectedTags, rating, userId } = await req.json()

//   if (!title || !theme || !userId) {
//     return new Response(JSON.stringify({ error: 'Title, theme, and userId are required.' }), { status: 400 })
//   }

//   try {
//     // Fetch filtered words based on tags and rating
//     const filteredWords = await getFilteredWords(selectedTags, rating)

//     if (!filteredWords.length) {
//       return new Response(JSON.stringify({ error: 'No words match the selected criteria.' }), { status: 400 })
//     }

//     // Generate the story prompt
//     const { prompt, finalWords } = await generateStory(filteredWords, theme)

//     // Call Claude API to generate the story text
//     const storyText = await callClaudeAPI(prompt)

//     // Create a new story document
//     const storyId = randomUUID()
//     const creationDate = new Date().toISOString()

//     const newStory = new Story({
//       storyId,
//       userId,
//       title,
//       theme,
//       tags: selectedTags,
//       rating,
//       creationDate,
//       wordsUsed: finalWords,
//       storyText,
//     })

//     // Save the story to the database
//     await newStory.save()

//     return new Response(JSON.stringify({ message: 'Story created successfully!', storyId }), { status: 201 })
//   } catch (error) {
//     console.error('Error creating story:', error)
//     return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500 })
//   }
// }
export async function POST(req, res) {
  await connectToDatabase() // Ensure you have a function to connect to your database
  const { title, theme, selectedTags, rating, userId, words } = await req.json()

  if (!title || !theme || !userId || !words || words.length === 0) {
    return new Response(JSON.stringify({ error: 'Title, theme, userId, and words are required.' }), { status: 400 })
  }

  try {
    // Generate the story prompt
    const selectedWords = words.slice(0, 75) // Limit to 75 words
    const wordsGroup1 = selectedWords.slice(0, Math.floor(selectedWords.length / 2))
    const wordsGroup2 = selectedWords.slice(Math.floor(selectedWords.length / 2))

    const prompt = `
        Por favor, crea exactamente 2 diálogos narrativos, naturales y coherentes en español, que simulen una conversación real entre dos personas.
        Tema: ${theme}
        Palabras clave para el primer diálogo: ${wordsGroup1.join(', ')}
        Palabras clave para el segundo diálogo: ${wordsGroup2.join(', ')}
      `

    // Call Claude API to generate the story text
    const storyText = await callClaudeAPI(prompt)

    // Create a new story document
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
      wordsUsed: selectedWords,
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
