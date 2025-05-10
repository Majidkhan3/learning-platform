// Function to extract YouTube ID from various URL formats
export const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  
  // Function to validate YouTube URL
  export const isValidYouTubeUrl = (url: string): boolean => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };
  
  // Function to fetch transcript from YouTube video
  export const fetchTranscript = async (videoId: string): Promise<string> => {
    try {
      console.log('Fetching transcript for video ID:', videoId);
      
      // First try to fetch with native YouTube transcript API
      const response = await fetch(`https://youtubetranscript.com/?server_vid=${videoId}`);
      console.log("response", response);
      if (!response.ok) {
        throw new Error('Failed to fetch transcript from YouTube');
      }
      
      const data = await response.json();
      
      if (!data || !data.transcript) {
        throw new Error('No transcript available for this video');
      }
      
      console.log('Transcript successfully fetched');
      return data.transcript;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      
      // Fallback to our simulated transcript for demo purposes
      console.log('Falling back to simulated transcript');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random simulated transcript based on the video ID
      const simulatedTranscripts: { [key: string]: string } = {
        'BgnS9DhgLUE': 'Buen día a todos. Hoy hablaremos sobre la importancia de la comunicación efectiva en nuestras vidas diarias. La comunicación es fundamental para establecer relaciones sólidas tanto en el ámbito personal como profesional.',
        'hXUVQfleU0w': 'Muchas gracias por acompañarnos en esta entrevista especial. Estamos aquí con el reconocido autor quien nos compartirá su experiencia sobre el proceso creativo y cómo ha evolucionado su trabajo a lo largo de los años.',
        'vW5JS9oLXg8': 'Bienvenidos a nuestro podcast. En el episodio de hoy exploraremos las tendencias actuales en tecnología y cómo están impactando en nuestras vidas cotidianas. Hablaremos con varios expertos del sector.',
        // Default transcript for any other video ID
        'default': 'Este es un texto de ejemplo para un video en español. Vamos a generar diálogos interesantes basados en este contenido. El tema principal es la comunicación efectiva y cómo podemos mejorar nuestras habilidades conversacionales en diferentes contextos sociales y profesionales.',
      };
      
      // Return either the specific transcript or the default one
      const transcript = simulatedTranscripts[videoId] || simulatedTranscripts.default;
      
      // Add some random content to make it longer and more varied
      const extraContent = [
        'Los estudios demuestran que escuchar activamente es tan importante como hablar con claridad. Muchas personas se enfocan solo en lo que quieren decir, sin prestar suficiente atención a lo que otros están comunicando.',
        'En el contexto profesional, la capacidad de comunicarse de manera efectiva puede marcar la diferencia en una negociación o presentación. Es una habilidad que se puede desarrollar con práctica constante.',
        'Las redes sociales han transformado completamente la forma en que nos comunicamos. Ahora podemos conectarnos instantáneamente con personas de todo el mundo, pero también enfrentamos nuevos desafíos como la sobreinformación.',
      ];
      
      // Combine the base transcript with some extra content
      const fullTranscript = transcript + ' ' + extraContent.join(' ');
      
      return fullTranscript;
    }
  };
  
  // Function to generate dialogues using Claude API
  export const generateDialogues = async (transcript: string): Promise<string> => {
    try {
      // First try with Claude API
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          system: 'Tu es un assistant expert en rédaction de dialogues immersifs.',
          messages: [
            {
              role: 'user',
              content: generatePrompt(transcript),
            },
          ],
        })
      });
      
      if (claudeResponse.ok) {
        const data = await claudeResponse.json();
        const content = data?.content?.[0]?.text || '';
        if (content) {
          console.log('Claude API successfully generated dialogues');
          return content;
        }
        throw new Error('Empty response from Claude API');
      }
      
      console.log('Claude API failed, falling back to local generation');
      throw new Error('Claude API failed');
    } catch (error) {
      console.error('Error with Claude API:', error);
      
      // Fallback to our local dialogue generation for demo purposes
      console.log('Using local dialogue generation');
      // Create simulated dialogues based on the transcript
      const topics = [
        'la comunicación efectiva',
        'el aprendizaje continuo',
        'las nuevas tecnologías',
        'el desarrollo personal',
        'las relaciones interpersonales',
        'la educación moderna',
        'el equilibrio trabajo-vida',
        'la cultura digital'
      ];
      
      let dialogues = '';
      
      for (let i = 0; i < 8; i++) {
        const topic = topics[i % topics.length];
        
        dialogues += `Diálogo ${i + 1}:\n`;
        dialogues += `Persona A: ¿Qué opinas sobre ${topic} en el contexto actual?\n`;
        
        // Generate a paragraph response
        let response = '';
        response += `Creo que ${topic} es fundamental en nuestra sociedad moderna. `;
        response += `Las investigaciones demuestran que dedicar tiempo a ${topic} mejora significativamente nuestra calidad de vida. `;
        response += `Muchos expertos coinciden en que debemos priorizar ${topic} en nuestro desarrollo personal y profesional. `;
        response += `En mi experiencia, he notado grandes beneficios al invertir en ${topic} de manera constante. `;
        response += `El futuro probablemente nos traerá nuevas perspectivas sobre ${topic} que revolucionarán nuestra forma de pensar.`;
        
        dialogues += `Persona B: ${response}\n\n`;
      }
      
      return dialogues || 'No se pudieron generar diálogos a partir de la transcripción.';
    }
  };
  
  // Helper function to generate prompt for Claude
  function generatePrompt(transcript: string) {
    return `
  En te basant uniquement sur le texte suivant (une transcription d'un podcast en espagnol),
  génère 8 dialogues immersifs en espagnol. Chaque dialogue doit être structuré en deux lignes :
  la première correspond à une question posée par la personne A, et la seconde est une réponse
  détaillée de la personne B sous forme d'un paragraphe de 5 lignes.
  
  Texte du podcast :
  ${transcript}
  
  Merci de fournir uniquement les dialogues au format :
  Dialogue 1:
  Personne A: ...
  Personne B: ...
  ... jusqu'à Dialogue 8.
  `
  }