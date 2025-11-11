'use client'

import { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { convertFromRaw } from 'draft-js';
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';
import { useAuth } from '@/components/wrappers/AuthProtectionWrapper'

const SynthesisModal = ({ reviewData, loading, onDelete, selectedVoice }) => {
  const { user, token } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const router = useRouter()
  let currentAudio = null;

  const handleSynthesisClick = (summary) => {
    let plainText = summary;

    try {
      if (summary && summary.trim().startsWith('{')) {
        const content = convertFromRaw(JSON.parse(summary));
        plainText = content.getPlainText('\n'); // ✅ Convert to plain text
      }
    } catch (e) {
      console.error('Error parsing summary:', e);
    }

    setSelectedDescription(plainText);
    setShowModal(true);
  };


  const handleImageClick = (image) => {
    setSelectedImage(image)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedDescription('')
    setSelectedImage('')
  }
    const handleRating = async (itemId, star, item) => {
  try {
    const res = await fetch(`/api/english/enword/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        word: item.word,
        tags: item.tags,
        note: star,
        summary: item.summary,
        image: item.image,
        userId: user._id,
      }),
    });

    if (!res.ok) throw new Error("Failed to update rating");

    // ✅ Quick local update so stars reflect immediately
    item.note = star;


    // Still refresh backend to stay consistent
    router.refresh();
  } catch (err) {
    console.error("Error updating rating:", err);
    alert("Failed to update rating. Please try again.");
  }
};


  // const speakWord = async (word) => {
  //   try {
  //     const response = await fetch('/api/polly', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         text: word,
  //         voice: selectedVoice,
  //         language: 'es-ES', // Adjust language as needed
  //       }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch Polly API')
  //     }

  //     const audioBlob = await response.blob()
  //     const audioUrl = URL.createObjectURL(audioBlob)

  //     const audio = new Audio(audioUrl)
  //     audio.play()
  //   } catch (error) {
  //     console.error('Error fetching Polly API:', error)
  //   }
  // }
  const speakWord = async (word) => {
    try {
      // Stop previous audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const response = await fetch('/api/polly?language=en-US', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: word,
          voice: selectedVoice,
          language: 'en-US',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Polly API');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      currentAudio = new Audio(audioUrl);
      currentAudio.play();

      // Reset currentAudio when done
      currentAudio.onended = () => {
        currentAudio = null;
      };
    } catch (error) {
      console.error('Error fetching Polly API:', error);
    }
  };
  const handleEditClick = (id) => {
    router.push(`/dashboards/english/edit/${id}`) // Navigate to the edit page with the item's ID
  }
  console.log('selected ', selectedDescription)

  const renderFormattedSynthesis = (text) => {
    const sections = text.split(/(?=[A-Z][a-z]+:)/); // Split at "Synonyms:", "Antonyms:", etc.

    return sections.map((section, index) => {
      if (!section.trim() || !section.includes(':')) return (
        <p key={index} className="mb-1">{section.trim()}</p>
      );

      const [title, items] = section.split(':');
      const itemList = (items || "")
        .split(/•|\n|,/)
        .map((i) => i.trim())
        .filter((i) => i);

      return (
        <div key={index} className="mb-3">
          <h6 className="fw-bold">{title.trim()}</h6>
          <ul>
            {itemList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      );
    });
  };
  return (
    <>
      <table className="table align-middle text-nowrap table-hover table-centered border-bottom mb-0">
        <thead className="bg-light-subtle">
          <tr>
            <th>Word</th>
            <th>Sound</th>
            <th>Tags</th>
            <th>Rating</th>
            <th>Synthesis</th>
            <th>Picture</th>
            <th>Youglish</th>
            <th>Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            reviewData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.word}</td>
                <td>
                  <Button variant="light" size="sm" className="p-1" onClick={() => speakWord(item.word)}>
                    <IconifyIcon icon="ri:volume-up-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>{item.tags.join(', ')}</td>
                <td>
                  <ul className="d-flex text-warning m-0 fs-5 list-unstyled">
                    {[1, 2, 3, 4].map((star) => (
                      <li
                        key={star}
                        className="icons-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRating(item._id, star, item)}
                      >
                        <IconifyIcon
                          icon={star <= item.note ? "ri:star-fill" : "ri:star-line"}
                        />
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Button variant="soft-info" size="sm" onClick={() => handleSynthesisClick(item.summary)}>
                    <IconifyIcon icon="ri:file-text-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button variant="soft-secondary" size="sm" onClick={() => handleImageClick(item.image)}>
                    <IconifyIcon icon="ri:image-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-primary"
                    size="sm"
                    onClick={() => window.open(`https://youglish.com/pronounce/${item.word}/english`, '_blank')}>
                    <IconifyIcon icon="ri:youtube-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button variant="soft-warning" size="sm" onClick={() => handleEditClick(item._id)}>
                    <IconifyIcon icon="ri:edit-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button variant="soft-danger" size="sm" onClick={() => onDelete(item._id)}>
                    <IconifyIcon icon="ri:delete-bin-line" className="align-middle fs-18" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Synthesis or Image */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage ? 'Word Image' : 'Word Synthesis'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
  {selectedImage ? (
    <img src={selectedImage} alt="Word Illustration" className="img-fluid rounded shadow-sm" />
  ) : (
    <div className="synthesis-content" style={{ whiteSpace: 'pre-line' }}>
      {(() => {
        // First, check if it's likely HTML
        const isLikelyHTML = /<(html|body|table|tr|td|th|ul|ol|li|div|span|strong|em|p|br|h[1-6])[\s>]/i.test(selectedDescription);
        
        if (isLikelyHTML) {
          try {
            const cleanedHtml = selectedDescription.replace(
              /<table/gi,
              '<table class="table table-bordered table-striped text-center align-middle w-100 rounded shadow-sm mb-3"'
            );
            return <div className="table-responsive">{parse(cleanedHtml)}</div>;
          } catch (err) {
            console.warn("HTML parse failed, fallback to text:", err);
            // Continue to other formats if HTML parsing fails
          }
        }

        // Check for AI formatted content (1. **Title**)
        if (selectedDescription.match(/^\d+\.\s+\*\*.+\*\*/m)) {
          const sections = [];
          const lines = selectedDescription.split('\n');
          let current = null;

          for (let line of lines) {
            line = line.trim();
            const titleMatch = line.match(/^\d+\.\s+\*\*(.+)\*\*/);
            if (titleMatch) {
              const title = titleMatch[1];
              current = { title, content: [] };
              sections.push(current);
            } else if (current && line) {
              current.content.push(line);
            }
          }

          return sections.map((s, idx) => (
            <div key={idx} className="mb-3">
              <h5 className="fw-bold">{s.title}</h5>
              <ul>
                {s.content.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ));
        }

        // Check for keyword sections like Synonyms:
        if (selectedDescription.match(/^[A-Z][a-z]+:/m)) {
          const parts = selectedDescription.split(/(?=[A-Z][a-z]+:)/);
          return parts.map((part, idx) => {
            if (!part.includes(':')) return <p key={idx}>{part.trim()}</p>;
            
            const [label, data] = part.split(':');
            const items = data
              .split(/•|\n|,/)
              .map(x => x.trim())
              .filter(x => x);

            return (
              <div key={idx} className="mb-3">
                <h6 className="fw-bold">{label.trim()}</h6>
                {items.length > 0 ? (
                  <ul>
                    {items.map((i, j) => (
                      <li key={j}>{i}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{data.trim()}</p>
                )}
              </div>
            );
          });
        }

        // Check for numbered lists with bullet points
        if (selectedDescription.match(/^\d+\.\s+.+(\n\s*•\s+.+)+/m)) {
          return (
            <div>
              {selectedDescription.split('\n').map((line, i) => {
                if (line.match(/^\d+\./)) {
                  return <h5 key={i} style={{ fontWeight: 'bold', margin: '15px 0 5px 0' }}>{line}</h5>;
                } else if (line.startsWith('•')) {
                  return <div key={i} style={{ marginLeft: '25px' }}>{line}</div>;
                } else if (line.trim() === '') {
                  return <br key={i} />;
                }
                return <div key={i}>{line}</div>;
              })}
            </div>
          );
        }

        // Final fallback - simple preformatted text
        return (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {selectedDescription.split('\n').map((line, i) => (
              line.trim() ? (
                <div key={i} className="mb-2">
                  {line.startsWith('•') ? (
                    <div style={{ marginLeft: '20px' }}>{line}</div>
                  ) : (
                    line
                  )}
                </div>
              ) : <br key={i} />
            ))}
          </div>
        );
      })()}
    </div>
  )}
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SynthesisModal
