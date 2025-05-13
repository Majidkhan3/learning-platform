"use client"
import React, { useState } from 'react';
import { Container, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';

const Page = () => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [promptContent, setPromptContent] = useState('');
  const [saved, setSaved] = useState(false);

  const prompts = [
    {
      id: 1,
      title: "Génération de Flashcards",
      description: "Personnalisez le prompt pour générer des flashcards d'étude",
      initialContent: `{
  "project": {
    "title": "Titre du projet",
    "description": "Description détaillée en français",
    "source": "type_source",
    "sourceContent": "Contenu textuel du projet"
  },
  "flashcards": [
    {
      "question": "Question 1",
      "answer": "Réponse détaillée 1"
    }
  ]
}

Important:
- Génère au moins 10 flashcards pertinentes
- Les réponses peuvent inclure du HTML simple pour le formatage
- La description doit être en français et être claire
- Évite d'utiliser des caractères de contrôle dans le JSON`
    },
    {
      id: 2,
      title: "Résumé de Document",
      description: "Personnalisez le prompt pour résumer des documents",
      initialContent: `{
  "document": {
    "title": "Titre du document",
    "type": "type_document",
    "content": "Contenu à résumer"
  },
  "summaryOptions": {
    "length": "court/moyen/long",
    "format": "bullet_points/paragraphes",
    "highlightKeyPoints": true
  }
}

Important:
- Le résumé doit capturer les points principaux
- Conserver la structure logique du document original
- Utiliser des marqueurs pour les points importants
- Rester fidèle au contenu original`
    },
    {
      id: 3,
      title: "Générateur de Code",
      description: "Personnalisez le prompt pour générer du code selon vos besoins",
      initialContent: `{
  "codeRequest": {
    "language": "javascript/python/autre",
    "framework": "react/vue/django/autre",
    "functionality": "Description de la fonctionnalité souhaitée",
    "requirements": [
      "Exigence 1",
      "Exigence 2"
    ]
  },
  "outputOptions": {
    "includeComments": true,
    "provideExplanation": true,
    "optimizationLevel": "basic/advanced"
  }
}

Important:
- Le code doit suivre les bonnes pratiques
- Inclure des commentaires explicatifs
- Gérer les cas d'erreur basiques
- Respecter les conventions de style du langage choisi`
    },
    {
      id: 4,
      title: "Analyse de Données",
      description: "Personnalisez le prompt pour analyser des ensembles de données",
      initialContent: `{
  "dataAnalysis": {
    "dataSource": "description_source_données",
    "dataFormat": "CSV/JSON/autre",
    "objectives": [
      "Objectif d'analyse 1",
      "Objectif d'analyse 2"
    ]
  },
  "visualizationOptions": {
    "types": ["graphiques", "tableaux", "cartes"],
    "colorScheme": "préférence_couleurs",
    "annotate": true
  },
  "insights": {
    "depth": "basique/avancé",
    "focus": "tendances/anomalies/comparaisons"
  }
}

Important:
- Analyser les tendances principales dans les données
- Identifier les corrélations significatives
- Présenter les résultats de façon claire et visuelle
- Fournir des interprétations des résultats`
    }
  ];

  const handlePromptSelect = (prompt) => {
    setActivePrompt(prompt);
    setPromptContent(prompt.initialContent);
    setSaved(false);
  };

  const handleSave = () => {
    // Logique pour sauvegarder le prompt (dans une application réelle)
    console.log(`Sauvegarde du prompt ${activePrompt.id} avec contenu:`, promptContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Gestion des Prompts</h1>
      <p className="text-muted mb-4">
        Personnalisez les prompts utilisés par Claude pour différentes fonctionnalités
      </p>

      <div className="d-flex">
        {/* Panneau de gauche - Liste des prompts disponibles */}
        <div style={{ width: '30%', marginRight: '2rem' }}>
          {prompts.map(prompt => (
            <Card 
              key={prompt.id} 
              className={`mb-3 ${activePrompt?.id === prompt.id ? 'border-primary' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePromptSelect(prompt)}
            >
              <Card.Body>
                <Card.Title>{prompt.title}</Card.Title>
                <Card.Text>{prompt.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Panneau de droite - Éditeur de prompt */}
        <div style={{ width: '70%' }}>
          {activePrompt ? (
            <>
              <Card className="mb-3">
                <Card.Header>
                  <h4>{activePrompt.title}</h4>
                  <p className="text-muted mb-0">{activePrompt.description}</p>
                </Card.Header>
                <Card.Body>
                  <Tabs defaultActiveKey="editor" className="mb-3">
                    <Tab eventKey="editor" title="Éditeur">
                      <Form.Group>
                        <Form.Label>Prompt pour la {activePrompt.title.toLowerCase()}</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={15}
                          value={promptContent}
                          onChange={(e) => setPromptContent(e.target.value)}
                          style={{ fontFamily: 'monospace' }}
                        />
                      </Form.Group>
                    </Tab>
                    <Tab eventKey="preview" title="Aperçu">
                      <div className="p-3 bg-light rounded">
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{promptContent}</pre>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  {saved && (
                    <Alert variant="success" className="py-1 px-3 mb-0">
                      Prompt sauvegardé avec succès!
                    </Alert>
                  )}
                  <div className="ms-auto">
                    <Button variant="secondary" className="me-2">
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Sauvegarder le prompt
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </>
          ) : (
            <Card className="text-center p-5">
              <Card.Body>
                <h4>Sélectionnez un prompt à personnaliser</h4>
                <p className="text-muted">
                  Choisissez l'un des prompts disponibles dans la liste à gauche pour commencer à le personnaliser
                </p>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Page;