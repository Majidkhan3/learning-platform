'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Button, ListGroup, Accordion, Stack } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper';

const FlashCard = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]); // State for fetched cards
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentIndex = parseInt(searchParams.get('index') || '1', 10);

  const currentCard = cards[currentIndex - 1]; // Adjust index for zero-based array

  const fetchWords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/words?userId=${userId}`); // Replace with your API endpoint
      const data = await res.json();
      if (data.success) {
        // Map API response to the card structure
        const mappedCards = data.words.map((word, index) => ({
          id: index + 1, // Assign sequential IDs
          word: word.word,
          synthesis: word.summary,
          rating: word.note || 0, // Default rating to 0 if not provided
          image: word.image,
          tags: word.tags,
        }));
        setCards(mappedCards);
      } else {
        setError(data.error || 'Failed to fetch words');
      }
    } catch (err) {
      console.error('Error fetching words:', err);
      setError('Failed to fetch words');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const goToCard = (index) => {
    if (index >= 1 && index <= cards.length) {
      router.push(`/dashboards/flashcard?tag=&rating=&index=${index}`);
      setIsFlipped(false);
    }
  };

  const handleRating = (star) => {
    const updatedCards = cards.map((card) =>
      card.id === currentCard.id ? { ...card, rating: star } : card
    );
    setCards(updatedCards);
  };

  // Automatically speak the word when the card appears
  useEffect(() => {
    if (currentCard && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.word);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentCard]); // Trigger whenever the currentCard changes

  // Handle "Enter" key behavior
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!isFlipped) {
          toggleFlip(); // Flip the card
        } else {
          goToCard(currentIndex + 1); // Go to the next card
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFlipped, currentIndex, cards]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="flashcard-container" style={{ width: '400px' }}>
        <div className="text-center mb-2">
          <small>
            Card {currentIndex} of {cards.length}
          </small>
        </div>

        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} style={{ height: '700px', perspective: '1000px' }}>
          <div
            className="flip-card-inner position-relative w-100 h-100"
            style={{ transition: 'transform 0.6s', transformStyle: 'preserve-3d' }}
          >
            {/* Front Side */}
            <Card
              className={`position-absolute w-100 h-100 ${isFlipped ? 'd-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', zIndex: '2' }}
              onClick={toggleFlip}
            >
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title className="text-center mb-4">{currentCard?.word}</Card.Title>
                <div className="mt-auto">
                  <div className="text-center mb-3">
                    <small>Click the card or press Enter to reveal content</small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Back Side */}
            <Card
              className={`position-absolute w-100 h-100 ${!isFlipped ? 'd-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Card.Body>
                <Card.Title className="text-center mb-4 d-flex justify-content-center align-items-center">
                  {currentCard?.word}
                  <Button
                    variant="link"
                    className="ms-2 p-0"
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(currentCard.word);
                      window.speechSynthesis.speak(utterance);
                    }}
                    aria-label="Speak Word"
                  >
                    <i className="bi bi-volume-up"></i> {/* Speaker Icon */}
                  </Button>
                </Card.Title>
                <Card.Subtitle className="mb-3 text-center d-flex justify-content-center align-items-center">
                  Synthesis
                  <i className="bi bi-info-circle ms-2" title="Synthesis Information"></i> {/* Synthesis Icon */}
                </Card.Subtitle>

                {/* Synthesis Content */}
                <div className="mb-3 text-center">
                  <p>{currentCard?.synthesis}</p>
                </div>

                {/* Rating Section */}
                <div className="mb-3">
                  <strong>Rate this card:</strong>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconifyIcon
                        key={star}
                        icon={`ri:star${star <= currentCard?.rating ? '-fill' : '-s-line'}`}
                        style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#ffc107' }}
                        onClick={() => handleRating(star)}
                      />
                    ))}
                  </div>
                </div>

                {/* Synonyms Accordion */}
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Synonyms</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {currentCard?.tags.map((tag, idx) => (
                          <ListGroup.Item key={idx}>{tag}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="text-center mt-3">
                  <Button variant="outline-primary" size="sm" onClick={toggleFlip}>
                    Flip Card
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Navigation Controls */}
        <Stack direction="horizontal" gap={3} className="justify-content-center mt-3">
          <Button variant="outline-secondary" onClick={() => goToCard(currentIndex - 1)} disabled={currentIndex <= 1}>
            ← Previous
          </Button>
          <Button variant="outline-secondary" onClick={() => goToCard(currentIndex + 1)} disabled={currentIndex >= cards.length}>
            Next →
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default FlashCard;