export default StoryPrompt = ({ theme }) => {
  return `
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

      Asegúrate de que ambos diálogos estén completos, sean coherentes, parezcan una conversación real y no se corten.`
}
