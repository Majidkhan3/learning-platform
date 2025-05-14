"use client"
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';

const Page = () => {
  const {user} = useAuth()

  const [activePrompt, setActivePrompt] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [promptContent, setPromptContent] = useState('');
  const [promptName, setPromptName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  // Fetch prompts from the database
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const userId = user?._id; // Replace with actual user ID from your auth system
        const response = await fetch(`/api/prompts?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setPrompts(data.prompts);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch prompts');
      }
    };

    fetchPrompts();
  }, []);

  const handlePromptSelect = (prompt) => {
    setActivePrompt(prompt);
    setPromptContent(prompt.promptText);
    setPromptName(prompt.name);
    setIsActive(prompt.isActive);
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      const userId = user?._id; // Replace with actual user ID
      const method = activePrompt?._id ? 'PUT' : 'POST';
      const url = '/api/prompts';
      
      const payload = {
        userId,
        name: promptName,
        promptText: promptContent,
        isActive,
        ...(activePrompt?._id && { promptId: activePrompt._id })
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSaved(true);
        // Refresh prompts list
        const updatedResponse = await fetch(`/api/prompts?userId=${userId}`);
        const updatedData = await updatedResponse.json();
        setPrompts(updatedData.prompts);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to save prompt');
    }
  };

  const handleDelete = async (promptId) => {
    try {
      const response = await fetch(`/api/prompts?promptId=${promptId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPrompts(prompts.filter(p => p._id !== promptId));
        if (activePrompt?._id === promptId) {
          setActivePrompt(null);
          setPromptContent('');
          setPromptName('');
          setIsActive(false);
        }
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to delete prompt');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Story Prompt Management</h1>
      <p className="text-muted mb-4">
        Customize and manage your story generation prompts
      </p>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <div className="d-flex">
        {/* Left panel - Prompts list */}
        <div style={{ width: '30%', marginRight: '2rem' }}>
          {/* <Button 
            variant="primary" 
            className="mb-3 w-100"
            onClick={() => {
              setActivePrompt(null);
              setPromptContent('');
              setPromptName('');
              setIsActive(false);
            }}
          >
            Create New Prompt
          </Button> */}

          {prompts.map(prompt => (
            <Card 
              key={prompt._id} 
              className={`mb-3 ${activePrompt?._id === prompt._id ? 'border-primary' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div onClick={() => handlePromptSelect(prompt)}>
                    <Card.Title>{prompt.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {prompt.isActive ? 'Active' : 'Inactive'}
                    </Card.Text>
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(prompt._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Right panel - Prompt editor */}
        <div style={{ width: '70%' }}>
          <Card>
            <Card.Header>
              <Form.Group className="mb-3">
                <Form.Label>Prompt Name</Form.Label>
                <Form.Control
                  type="text"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  placeholder="Enter prompt name"
                />
              </Form.Group>
              <Form.Check
                type="switch"
                id="active-switch"
                label="Set as active prompt"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </Card.Header>
            <Card.Body>
              <Tabs defaultActiveKey="editor" className="mb-3">
                <Tab eventKey="editor" title="Editor">
                  <Form.Group>
                    <Form.Label>Prompt Template</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={15}
                      value={promptContent}
                      onChange={(e) => setPromptContent(e.target.value)}
                      style={{ fontFamily: 'monospace' }}
                      placeholder="Enter your prompt template here. Use ${theme}, ${group1Text}, and ${group2Text} as placeholders."
                    />
                  </Form.Group>
                </Tab>
                <Tab eventKey="preview" title="Preview">
                  <div className="p-3 bg-light rounded">
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{promptContent}</pre>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
              {saved && (
                <Alert variant="success" className="py-1 px-3 mb-0">
                  Prompt saved successfully!
                </Alert>
              )}
              <div className="ms-auto">
                <Button 
                  variant="secondary" 
                  className="me-2"
                  onClick={() => handlePromptSelect(activePrompt)}
                >
                  Reset
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSave}
                  disabled={!promptName || !promptContent}
                >
                  Save Prompt
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Page;