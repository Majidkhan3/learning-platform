'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, Button, ListGroup, Accordion, Stack, Modal, Col } from 'react-bootstrap'
import { useSwipeable } from 'react-swipeable' // Import react-swipeable
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'
import { Icon } from '@iconify/react/dist/iconify.js'
import parse from 'html-react-parser'; // Import html-react-parser for HTML content parsing
import { convertFromRaw } from 'draft-js' // Import Draft.js for content parsing

const FlashCard = () => {
  const { user, token } = useAuth()
  const userId = user?._id
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cards, setCards] = useState([]) // State for fetched cards
  const [showModal, setShowModal] = useState(false) // State for modal visibility
  const [modalImage, setModalImage] = useState('') // State for the image to display in the modal
  const searchParams = useSearchParams()
  const router = useRouter()
  const tag = searchParams.get('tag')
  const rating = searchParams.get('rating')
  const currentIndex = parseInt(searchParams.get('index') || '1', 10)
  const currentCard = cards[currentIndex - 1] // Adjust index for zero-based array
  const synthesisRef = useRef(null);
  useEffect(() => {
    if (synthesisRef.current) {
      synthesisRef.current.scrollTop = 0;
    }
  }, [currentIndex, isFlipped]);

  const fetchWords = async () => {
    try {
      setLoading(true)
      // Construct the API URL with query parameters for tag and rating
      let apiUrl = `/api/french/frword?userId=${userId}`
      if (tag) {
        apiUrl += `&tag=${encodeURIComponent(tag)}`
      }
      if (rating) {
        apiUrl += `&rating=${encodeURIComponent(rating)}`
      }

      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }) // Use the updated API URL
      const data = await res.json()
      if (data.success) {
        // Map API response to the card structure
        const filteredCards = data.words.filter((word) => {
          const matchesTag = !tag || tag === 'All' || word.tags?.includes(tag)
          let matchesRating = true
          if (rating && rating !== 'All') {
            const selectedRatings = rating.split(',') // Support multi-select
            if (selectedRatings.includes('Aucune évaluation')) {
              matchesRating = !word.note || word.note === 0
            } else {
              matchesRating = selectedRatings.some(r => word.note === parseInt(r))
            }
          }
          return matchesTag && matchesRating
        })
        const mappedCards = filteredCards.map((word, index) => ({
          id: word._id, // Use the database ID
          word: word.word,
          synthesis: word.summary,
          rating: word.note || 0, // Default rating to 0 if not provided
          image: word.image,
          tags: word.tags,
        }))
        setCards(mappedCards)
        if (mappedCards.length > 0 && currentIndex > mappedCards.length) {
          // If current index is out of bounds after filtering, reset to 1
          router.push(`/dashboards/french/flashcards?tag=${tag || ''}&rating=${rating || ''}&index=1`)
        } else if (mappedCards.length === 0) {
          setError('No cards found for the selected filters.')
        }
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
    if (userId) {
      // Ensure userId is available before fetching
      fetchWords()
    }
  }, [userId, tag, rating])

  useEffect(() => {
    const speakWithPolly = async (text) => {
      try {
        const response = await fetch('/api/polly?language=fr-FR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
          body: JSON.stringify({
            text,
            voice: 'Lea', // Use a specific voice for Spanish
            language: 'fr-FR', // Adjust language as needed
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

  const toggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);


  const goToCard = useCallback((index) => {
    if (index >= 1 && index <= cards.length) {
      if (tag && rating) {
        router.push(`/dashboards/french/flashcards?tag=${tag}&rating=${rating}&index=${index}`)
      } else if (tag) {
        router.push(`/dashboards/french/flashcards?tag=${tag}&index=${index}`)
      } else if (rating) {
        router.push(`/dashboards/french/flashcards?rating=${rating}&index=${index}`)
      } else {
        router.push(`/dashboards/french/flashcards?index=${index}`)
      }
      setIsFlipped(false)
    }
  }, [cards.length, tag, rating, router]);


  const handleTap = useCallback(() => {
    if (!isFlipped) {
      toggleFlip() // Flip the card on the first tap
    } else {
      goToCard(currentIndex + 1) // Go to the next card on the second tap
    }
  }, [isFlipped, goToCard, currentIndex, toggleFlip]);

  const handleKeyPress = useCallback(
    (e) => {
      if (!cards.length) return;
      console.log('Key pressed:', e.key, 'currentIndex:', currentIndex);

      if (['Enter', 'ArrowRight', 'ArrowLeft', 'Escape'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'Enter':
          if (!isFlipped) {
            toggleFlip();
          } else {
            goToCard(currentIndex + 1);
          }
          break;
        case 'ArrowRight':
          goToCard(currentIndex + 1);
          break;
        case 'ArrowLeft':
          goToCard(currentIndex - 1);
          break;
        case 'Escape':  // ✅ NEW
          router.push('/dashboards/french'); // Or wherever the word list is
          break;
        default:
          break;
      }
    },
    [cards.length, currentIndex, isFlipped, toggleFlip, goToCard, router]
  );

  const handleYouGlish = (word) => {
    if (word) {
      window.open(`https://youglish.com/pronounce/${word}/french`, '_blank')
    }
  }
  const handleRating = async (star) => {
    if (!currentCard) return;

    try {
      // Create a complete copy of the current card with updated rating
      const updatedCard = {
        ...currentCard,
        rating: star,
        // synthesis: currentCard.synthesis // Explicitly preserve synthesis
      };

      // Optimistically update local state
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === currentCard.id ? updatedCard : card
        )
      );

      // Update the rating in the database
      const response = await fetch(`/api/french/frword/${currentCard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          word: currentCard.word,
          tags: currentCard.tags,
          note: star,
          summary: currentCard.synthesis, // Ensure synthesis is sent to backend
          image: currentCard.image,
          userId, // Include userId for the update
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rating');
      }

      // Optionally: Refresh the data from server to ensure consistency
      // fetchWords();

    } catch (err) {
      console.error('Error updating rating:', err);
      // Revert UI if API call fails
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === currentCard.id ? currentCard : card
        )
      );
      setError('Failed to update rating');
    }
  };

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
  }, [handleKeyPress])

  const renderFormattedSynthesis = (text) => {
    if (!text) return null;

    // 1) Check for HTML content
    const isLikelyHTML = /<(html|body|table|tr|td|th|ul|ol|li|div|span|strong|em|p)[\s>]/i.test(text);
    if (isLikelyHTML) {
      try {
        const cleanedHtml = text.replace(
          /<table/gi,
          '<table class="table table-bordered table-striped text-center align-middle w-100 rounded shadow-sm mb-3"'
        );
        return <div className="table-responsive">{parse(cleanedHtml)}</div>;
      } catch (err) {
        console.warn("HTML parse failed, fallback to text:", err);
      }
    }

    // 2) Check for AI-formatted content (1. **Title**)
    if (text.match(/^\d+\. \*\*.+\*\*/m)) {
      const sections = [];
      const lines = text.split('\n');
      let current = null;

      for (let line of lines) {
        line = line.trim();
        if (line.match(/^\d+\. \*\*(.+)\*\*/)) {
          const title = line.match(/^\d+\. \*\*(.+)\*\*/)[1];
          current = { title, content: [] };
          sections.push(current);
        } else if (current && line) {
          current.content.push(line);
        }
      }

      return sections.map((s, idx) => (
        <div key={idx} className="mb-3">
          <h6 className="fw-bold" style={{ color: '#2c3e50' }}>{s.title}</h6>
          <ul className="list-unstyled ps-3">
            {s.content.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ));
    }

    // 3) Check for keyword sections (Synonyms:, Antonyms:, etc.)
    if (text.match(/[A-Z][a-z]+:/)) {
      const parts = text.split(/(?=[A-Z][a-z]+:)/);
      return parts.map((part, idx) => {
        if (!part.includes(':')) return <p key={idx}>{part.trim()}</p>;
        const [label, data] = part.split(':');
        const items = data
          .split(/•|\n|,/)
          .map(x => x.trim())
          .filter(x => x);

        return (
          <div key={idx} className="mb-3">
            <h6 className="fw-bold" style={{ color: '#2c3e50' }}>{label.trim()}</h6>
            <ul className="list-unstyled ps-3">
              {items.map((i, j) => (
                <li key={j}>{i}</li>
              ))}
            </ul>
          </div>
        );
      });
    }

    // 4) Special case for numbered lists with bullet points
    if (text.match(/^\d+\.\s+.+\n(\s*•\s+.+\n)+/m)) {
      return (
        <>
          {text.split('\n').map((line, i) => {
            if (line.match(/^\d+\./)) {
              return <h6 key={i} style={{ fontWeight: 'bold', margin: '15px 0 5px 0', color: '#2c3e50' }}>{line}</h6>;
            } else if (line.startsWith('•')) {
              return <div key={i} style={{ marginLeft: '20px', paddingLeft: '5px' }}>{line}</div>;
            } else if (line.trim() === '') {
              return <br key={i} />;
            }
            return <div key={i}>{line}</div>;
          })}
        </>
      );
    }

    // 5) Plain text fallback
    return (
      <>
        {text.split('\n').map((line, i) => (
          line.trim() ? (
            <p key={i} className="mb-2">{line}</p>
          ) : (
            <br key={i} />
          )
        ))}
      </>
    );
  };

  // Swipe handlers for touch gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToCard(currentIndex + 1), // Swipe left to go to the next card
    onSwipedRight: () => goToCard(currentIndex - 1), // Swipe right to go to the previous card
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: Allow swipe gestures with a mouse
  })

  if (loading)
    return (
      <Col className="text-center w-full justify-center py-5">
        <Icon icon="eos-icons:loading" className="text-primary" width="50" height="50" spin />
        <p className="text-muted">Chargement des FlashCards...</p>
      </Col>
    )
  if (error) return <div className="text-center text-danger">{error}</div>

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="link"
          className="me-3 p-0"
          onClick={() => router.push('/dashboards/french')}
        >
          <IconifyIcon icon="bi:arrow-left" width={20} />
        </Button>
        <h4 className="mb-0">Cartes mémoire</h4>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
        onClick={handleTap} // Handle tap for mobile devices
        {...swipeHandlers} // Attach swipe handlers for touch gestures
      >
        <div className="flashcard-container" style={{ width: '400px' }}>
          <div className="text-center mb-2">
            <small>
              Carte {currentIndex} of {cards.length}
            </small>
          </div>

          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} style={{ height: '1500px', perspective: '1000px' }}>
            <div className="flip-card-inner position-relative w-100 h-100" style={{ transition: 'transform 0.6s', transformStyle: 'preserve-3d' }}>
              {/* Front Side */}
              <Card className={`position-absolute w-100 h-100 ${isFlipped ? 'd-none' : ''}`} style={{ backfaceVisibility: 'hidden', zIndex: '2' }}>
                <Card.Body className="d-flex flex-column h-100">
                  <Card.Title className="text-center mb-4">{currentCard?.word}</Card.Title>
                  <div className="mt-auto">
                    <div className="text-center mb-3">
                      <small>Appuyez pour afficher le contenu</small>
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
                    {currentCard?.word}
                    <Button
                      variant="link"
                      className="ms-2 p-0"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the tap handler
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
                  {/* <div className="mb-3 text-center">
                  <p>{currentCard?.synthesis}</p>
                </div> */}
                  <div ref={synthesisRef} className="synthesis-content mb-3 bg-body text-body p-3 rounded" style={{
                    fontSize: '0.9rem',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '600px',  // Set a fixed height
                    overflowY: 'auto',   // Enable vertical scrolling
                    padding: '15px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    {(() => {
                      // First try to parse as Draft.js content if it looks like JSON
                      if (currentCard?.synthesis?.trim().startsWith('{')) {
                        try {
                          const content = convertFromRaw(JSON.parse(currentCard.synthesis));
                          const plainText = content.getPlainText('\n');
                          return renderFormattedSynthesis(plainText);
                        } catch (e) {
                          console.error('Error parsing Draft.js content:', e);
                          return renderFormattedSynthesis(currentCard?.synthesis || '');
                        }
                      }
                      return renderFormattedSynthesis(currentCard?.synthesis || '');
                    })()}
                  </div>
                  <div className="text-center mb-3">
                    <Button
                      variant="soft-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering the tap handler
                        handleYouGlish(currentCard?.word)
                      }}
                      className="d-flex align-items-center justify-content-center mx-auto"
                      style={{ maxWidth: '150px' }}
                    >
                      <IconifyIcon icon="ri:youtube-line" className="me-2 fs-18" />
                      YouGlish
                    </Button>
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
                      <Accordion.Header>Etiquettes</Accordion.Header>
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
                      }}>
                      Retournez la carte
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
            className="justify-content-center mt-3">
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering the tap handler
                goToCard(currentIndex - 1)
              }}
              disabled={currentIndex <= 1}>
              ← Précédent
            </Button>
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering the tap handler
                goToCard(currentIndex + 1)
              }}
              disabled={currentIndex >= cards.length}>
              Suivant →
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
    </>
  )
}

export default FlashCard
