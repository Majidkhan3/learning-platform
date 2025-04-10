'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, Button, ListGroup, Accordion, Stack } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const FlashCard = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cards, setCards] = useState([
    { id: 1, word: 'Hola', synthesis: 'Spanish greeting', rating: 0 },
    { id: 2, word: 'Knife', synthesis: 'Cutting tool', rating: 0 },
    { id: 3, word: 'Book', synthesis: 'Reading material', rating: 0 },
  ])
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentIndex = parseInt(searchParams.get('index') || '1', 10)

  const currentCard = cards.find((card) => card.id === currentIndex) || cards[0]

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const goToCard = (index) => {
    if (index >= 1 && index <= cards.length) {
      router.push(`/dashboards/flashcard?tag=&rating=&index=${index}`)
      setIsFlipped(false)
    }
  }

  // Function to update rating in state
  const handleRating = (star) => {
    const updatedCards = cards.map((card) => (card.id === currentCard.id ? { ...card, rating: star } : card))
    setCards(updatedCards)
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="flashcard-container" style={{ width: '400px' }}>
        <div className="text-center mb-2">
          <small>
            Card {currentIndex} of {cards.length}
          </small>
        </div>

        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} style={{ height: '500px', perspective: '1000px' }}>
          <div className="flip-card-inner position-relative w-100 h-100" style={{ transition: 'transform 0.6s', transformStyle: 'preserve-3d' }}>
            {/* Front Side */}
            <Card
              className={`position-absolute w-100 h-100 ${isFlipped ? 'd-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', zIndex: '2' }}
              onClick={toggleFlip}>
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title className="text-center mb-4">{currentCard.word}</Card.Title>
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
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <Card.Body>
                <Card.Title className="text-center mb-4 d-flex justify-content-center align-items-center">
                  {currentCard.word}
                  <Button
                    variant="link"
                    className="ms-2 p-0"
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(currentCard.word)
                      window.speechSynthesis.speak(utterance)
                    }}
                    aria-label="Speak Word">
                    <i className="bi bi-volume-up"></i> {/* Speaker Icon */}
                  </Button>
                </Card.Title>
                <Card.Subtitle className="mb-3 text-center d-flex justify-content-center align-items-center">
                  Synthesis
                  <i className="bi bi-info-circle ms-2" title="Synthesis Information"></i> {/* Synthesis Icon */}
                </Card.Subtitle>

                {/* Synthesis Content */}
                <div className="mb-3 text-center">
                  <p>{currentCard.synthesis}</p>
                </div>

                {/* Rating Section */}
                <div className="mb-3">
                  <strong>Rate this card:</strong>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconifyIcon
                        key={star}
                        icon={`ri:star${star <= currentCard.rating ? '-fill' : '-s-line'}`} // Conditionally use filled star
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
                        <ListGroup.Item className="d-flex align-items-center">
                          <input type="checkbox" className="form-check-input me-2" id="youglish" />
                          <label htmlFor="youglish">Youglish</label>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Button
                  variant="link"
                  className="ms-2 p-0"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(currentCard.word)
                    window.speechSynthesis.speak(utterance)
                  }}
                  aria-label="Speak Word">
                  <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                </Button>

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
  )
}

export default FlashCard
