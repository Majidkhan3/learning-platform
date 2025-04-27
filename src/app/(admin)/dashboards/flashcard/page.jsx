'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, Button, ListGroup, Accordion, Stack, Modal } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const FlashCard = () => {
  const { user } = useAuth()
  const userId = user?._id
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cards, setCards] = useState([]) // State for fetched cards
  const [showModal, setShowModal] = useState(false) // State for modal visibility
  const [modalImage, setModalImage] = useState('') // State for the image to display in the modal
  const searchParams = useSearchParams()

  const router = useRouter()
  const currentIndex = parseInt(searchParams.get('index') || '1', 10)

  const currentCard = cards[currentIndex - 1] // Adjust index for zero-based array

  const fetchWords = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/words?userId=${userId}`) // Replace with your API endpoint
      const data = await res.json()
      if (data.success) {
        // Map API response to the card structure
        const mappedCards = data.words.map((word, index) => ({
          id: word._id, // Use the database ID
          word: word.word,
          synthesis: word.summary,
          rating: word.note || 0, // Default rating to 0 if not provided
          image: word.image,
          tags: word.tags,
        }))
        setCards(mappedCards)
      } else {
        setError(data.error || 'Failed to fetch words')
      }
    } catch (err) {
      console.error('Error fetching words:', err)
      setError('Failed to fetch words')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])
  
  useEffect(() => {
    const speakWithPolly = async (text) => {
      try {
        const response = await fetch('/api/polly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            voice: 'Lucia', // Use the "Lucia" voice
            language: 'es-ES', // Adjust language as needed
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch Polly API')
        }

        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)

        const audio = new Audio(audioUrl)
        audio.play()
      } catch (error) {
        console.error('Error fetching Polly API:', error)
      }
    }

    if (currentCard?.word) {
      speakWithPolly(currentCard.word) // Speak the word using Polly
    }
  }, [currentCard?.word])

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const goToCard = (index) => {
    if (index >= 1 && index <= cards.length) {
      router.push(`/dashboards/flashcard?tag=&rating=&index=${index}`)
      setIsFlipped(false)
    }
  }

  const handleTap = () => {
    if (!isFlipped) {
      toggleFlip() // Flip the card on the first tap
    } else {
      goToCard(currentIndex + 1) // Go to the next card on the second tap
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTap() // Trigger the same behavior as tapping
    }
  }

  const handleRating = async (star) => {
    if (!currentCard) return

    try {
      const updatedCard = { ...currentCard, rating: star }
      setCards((prevCards) => prevCards.map((card) => (card.id === currentCard.id ? updatedCard : card)))

      // Update the rating in the database
      const response = await fetch(`/api/words/${currentCard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: currentCard.word, // Include the required 'word' field
          tags: currentCard.tags,
          note: star,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Failed to update rating:', errorData.error)
        setError('Failed to update rating')
      }
    } catch (err) {
      console.error('Error updating rating:', err)
      setError('Error updating rating')
    }
  }

  const openModal = (image) => {
    setModalImage(image)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalImage('')
  }

  useEffect(() => {
    // Add keypress listener for desktop behavior
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isFlipped, currentIndex])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-danger">{error}</div>

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
      onClick={handleTap} // Handle tap for mobile devices
    >
      <div className="flashcard-container" style={{ width: '400px' }}>
        <div className="text-center mb-2">
          <small>
            Card {currentIndex} of {cards.length}
          </small>
        </div>

        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} style={{ height: '773px', perspective: '1000px' }}>
          <div className="flip-card-inner position-relative w-100 h-100" style={{ transition: 'transform 0.6s', transformStyle: 'preserve-3d' }}>
            {/* Front Side */}
            <Card
              className={`position-absolute w-100 h-100 ${isFlipped ? 'd-none' : ''}`}
              style={{ backfaceVisibility: 'hidden', zIndex: '2' }}
            >
              <Card.Body className="d-flex flex-column h-100">
                <Card.Title className="text-center mb-4">{currentCard?.word}</Card.Title>
                <div className="mt-auto">
                  <div className="text-center mb-3">
                    <small>Tap to reveal content</small>
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
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering the tap handler
                      const utterance = new SpeechSynthesisUtterance(currentCard.word)
                      window.speechSynthesis.speak(utterance)
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
                <div className="text-center mb-3">
                  {currentCard?.image ? (
                    <img
                      src={currentCard.image}
                      alt="Card"
                      className="img-fluid"
                      style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the tap handler
                        openModal(currentCard.image)
                      }}
                    />
                  ) : (
                    <p>No image available for this card.</p>
                  )}
                </div>
                {/* Synthesis Content */}
                <div className="mb-3 text-center">
                  <p>{currentCard?.synthesis}</p>
                </div>

                {/* Rating Section */}
                <div className="mb-3">
                  <strong>Rate this card:</strong>
                  <div className="d-flex justify-content-center align-items-center mt-2">
                    {[1, 2, 3, 4].map((star) => (
                      <IconifyIcon
                        key={star}
                        icon={`ri:star${star <= currentCard?.rating ? '-fill' : '-s-line'}`}
                        style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#ffc107' }}
                        onClick={(e) => {
                          e.stopPropagation() // Prevent triggering the tap handler
                          handleRating(star)
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Synonyms Accordion */}
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Tags</Accordion.Header>
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
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering the tap handler
                      toggleFlip()
                    }}
                  >
                    Flip Card
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Navigation Controls */}
        <Stack
          direction="horizontal"
          style={{
            gap: '200px',
          }}
          className="justify-content-center mt-3"
        >
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              e.stopPropagation() // Prevent triggering the tap handler
              goToCard(currentIndex - 1)
            }}
            disabled={currentIndex <= 1}
          >
            ← Previous
          </Button>
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              e.stopPropagation() // Prevent triggering the tap handler
              goToCard(currentIndex + 1)
            }}
            disabled={currentIndex >= cards.length}
          >
            Next →
          </Button>
        </Stack>
      </div>

      {/* Modal for Image */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={modalImage} alt="Preview" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '500px' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FlashCard