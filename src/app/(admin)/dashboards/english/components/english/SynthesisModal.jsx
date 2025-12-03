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
  console.log('selectedDescription ', selectedDescription)
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
    <div className="synthesis-content">
      {(() => {
        // Safety check for empty or null content
        if (!selectedDescription || typeof selectedDescription !== 'string') {
          return <p className="text-muted">No content available</p>;
        }

        const content = selectedDescription.trim();
        if (!content) {
          return <p className="text-muted">No content available</p>;
        }

        // 1. Check if it's JSON (Draft.js format or other JSON)
        if (content.startsWith('{') && content.endsWith('}')) {
          try {
            const jsonData = JSON.parse(content);
            // Check if it's Draft.js format
            if (jsonData.blocks && Array.isArray(jsonData.blocks)) {
              const convertedContent = convertFromRaw(jsonData);
              const plainText = convertedContent.getPlainText('\n');
              return (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {plainText.split('\n').map((line, i) => (
                    <div key={i} className="mb-1">{line || <br />}</div>
                  ))}
                </div>
              );
            }
            // Other JSON format
            return (
              <div>
                <h6 className="text-info mb-2">JSON Content:</h6>
                <pre className="bg-light p-3 rounded small">
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
              </div>
            );
          } catch (err) {
            console.warn("JSON parse failed, continuing to other formats:", err);
          }
        }

        // 2. Check if it's full HTML document (Ollama response)
        const isFullHTML = content.includes('<!DOCTYPE html>') || content.includes('<html');
        
        if (isFullHTML) {
          try {
            // Extract content from body tag if it exists, otherwise use the whole content
            let htmlContent = content;
            const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            if (bodyMatch) {
              htmlContent = bodyMatch[1];
            }
            
            // Clean and enhance the HTML for better Bootstrap styling
            const cleanedHtml = htmlContent
              // Remove DOCTYPE and html/head tags if they exist
              .replace(/<!DOCTYPE[^>]*>/gi, '')
              .replace(/<\/?html[^>]*>/gi, '')
              .replace(/<head[\s\S]*?<\/head>/gi, '')
              // Enhance table styling
              .replace(/<table(?![^>]*class)/gi, '<table class="table table-bordered table-striped table-hover"')
              .replace(/<table([^>]*class="[^"]*")([^>]*)>/gi, '<table$1 table-bordered table-striped table-hover"$2>')
              // Style headers
              .replace(/<h1([^>]*)>/gi, '<h1$1 class="text-primary mb-3">')
              .replace(/<h2([^>]*)>/gi, '<h2$1 class="text-secondary mb-2">')
              .replace(/<h3([^>]*)>/gi, '<h3$1 class="text-info mb-2">')
              .replace(/<h4([^>]*)>/gi, '<h4$1 class="text-dark mb-2">')
              .replace(/<h5([^>]*)>/gi, '<h5$1 class="text-dark mb-1">')
              .replace(/<h6([^>]*)>/gi, '<h6$1 class="text-muted mb-1">')
              // Style sections
              .replace(/<section([^>]*)>/gi, '<div$1 class="mb-4">')
              .replace(/<\/section>/gi, '</div>')
              // Style paragraphs
              .replace(/<p(?![^>]*class)/gi, '<p class="mb-2"')
              // Style lists
              .replace(/<ul(?![^>]*class)/gi, '<ul class="mb-3"')
              .replace(/<ol(?![^>]*class)/gi, '<ol class="mb-3"')
              .replace(/<li(?![^>]*class)/gi, '<li class="mb-1"')
              // Remove inline background styles that might conflict
              .replace(/style="[^"]*background-color:[^"]*"/gi, '')
              .replace(/style="[^"]*color:\s*black[^"]*"/gi, '');
            
            return (
              <div className="table-responsive">
                <style jsx>{`
                  .synthesis-content img {
                    max-width: 24px;
                    height: auto;
                  }
                  .synthesis-content table {
                    font-size: 0.9rem;
                  }
                  .synthesis-content th {
                    background-color: #f8f9fa;
                    font-weight: 600;
                  }
                  .synthesis-content .synonyms,
                  .synthesis-content .antonyms {
                    background-color: #f8f9fa;
                    padding: 1rem;
                    border-radius: 0.375rem;
                    border-left: 4px solid #007bff;
                  }
                  .synthesis-content .cecrl {
                    background-color: #e8f4f8;
                    padding: 1rem;
                    border-radius: 0.375rem;
                    border-left: 4px solid #17a2b8;
                  }
                `}</style>
                {parse(cleanedHtml)}
              </div>
            );
          } catch (err) {
            console.warn("HTML parse failed, fallback to text:", err);
            // Continue to other formats if HTML parsing fails
          }
        }

        // 3. Check if it's partial HTML content (table, div, etc.)
        const isLikelyHTML = /<(table|tr|td|th|ul|ol|li|div|span|strong|em|p|br|h[1-6]|section|article|header|footer|nav|main|aside)[\s>]/i.test(content);
        
        if (isLikelyHTML) {
          try {
            const cleanedHtml = content
              .replace(/<table(?![^>]*class)/gi, '<table class="table table-bordered table-striped text-center align-middle w-100 rounded shadow-sm mb-3"')
              .replace(/<h1(?![^>]*class)/gi, '<h1 class="text-primary mb-3"')
              .replace(/<h2(?![^>]*class)/gi, '<h2 class="text-secondary mb-2"')
              .replace(/<h3(?![^>]*class)/gi, '<h3 class="text-info mb-2"')
              .replace(/<p(?![^>]*class)/gi, '<p class="mb-2"')
              .replace(/<ul(?![^>]*class)/gi, '<ul class="mb-3"')
              .replace(/<ol(?![^>]*class)/gi, '<ol class="mb-3"');
            
            return <div className="table-responsive">{parse(cleanedHtml)}</div>;
          } catch (err) {
            console.warn("HTML parse failed, fallback to text:", err);
            // Continue to other formats if HTML parsing fails
          }
        }

        // 4. Check for Markdown-style headers (# ## ###)
        if (content.match(/^#{1,6}\s+/m)) {
          return (
            <div>
              {content.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                
                if (trimmedLine.startsWith('# ')) {
                  return <h1 key={i} className="text-primary mb-3">{trimmedLine.substring(2)}</h1>;
                } else if (trimmedLine.startsWith('## ')) {
                  return <h2 key={i} className="text-secondary mb-2">{trimmedLine.substring(3)}</h2>;
                } else if (trimmedLine.startsWith('### ')) {
                  return <h3 key={i} className="text-info mb-2">{trimmedLine.substring(4)}</h3>;
                } else if (trimmedLine.startsWith('#### ')) {
                  return <h4 key={i} className="text-dark mb-2">{trimmedLine.substring(5)}</h4>;
                } else if (trimmedLine.startsWith('##### ')) {
                  return <h5 key={i} className="text-dark mb-1">{trimmedLine.substring(6)}</h5>;
                } else if (trimmedLine.startsWith('###### ')) {
                  return <h6 key={i} className="text-muted mb-1">{trimmedLine.substring(7)}</h6>;
                } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('+ ')) {
                  return <div key={i} className="ms-3 mb-1">• {trimmedLine.substring(2)}</div>;
                } else if (trimmedLine.match(/^\d+\.\s+/)) {
                  return <div key={i} className="mb-1">{trimmedLine}</div>;
                } else if (trimmedLine === '') {
                  return <br key={i} />;
                }
                return <div key={i} className="mb-1">{trimmedLine}</div>;
              })}
            </div>
          );
        }

        // 5. Check for AI formatted content (1. **Title**)
        if (content.match(/^\d+\.\s+\*\*.+\*\*/m)) {
          const sections = [];
          const lines = content.split('\n');
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
            <div key={idx} className="mb-4">
              <h5 className="fw-bold text-primary">{s.title}</h5>
              <div className="ms-3">
                {s.content.map((line, i) => (
                  <div key={i} className="mb-1">
                    {line.startsWith('- ') || line.startsWith('• ') ? (
                      <div className="ms-2">• {line.substring(2)}</div>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </div>
          ));
        }

        // 6. Check for keyword sections like "Synonyms:", "Usage:", etc.
        if (content.match(/^[A-Z][a-zA-Z\s]+:/m)) {
          const parts = content.split(/(?=^[A-Z][a-zA-Z\s]+:)/m);
          return parts.map((part, idx) => {
            if (!part.includes(':')) {
              return part.trim() ? <p key={idx} className="mb-2">{part.trim()}</p> : null;
            }
            
            const colonIndex = part.indexOf(':');
            const label = part.substring(0, colonIndex).trim();
            const data = part.substring(colonIndex + 1).trim();
            
            const items = data
              .split(/[•\n,-]/)
              .map(x => x.trim())
              .filter(x => x && x.length > 1);

            return (
              <div key={idx} className="mb-4 p-3 bg-light rounded border-start border-primary border-3">
                <h6 className="fw-bold text-secondary mb-2">{label}</h6>
                {items.length > 1 ? (
                  <ul className="mb-0">
                    {items.map((item, j) => (
                      <li key={j} className="mb-1">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-0">{data}</p>
                )}
              </div>
            );
          }).filter(Boolean);
        }

        // 7. Check for numbered lists with bullet points
        if (content.match(/^\d+\.\s+.+(\n\s*[•\-\*]\s+.+)+/m)) {
          return (
            <div>
              {content.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                
                if (trimmedLine.match(/^\d+\./)) {
                  return <h5 key={i} className="fw-bold text-primary mt-3 mb-2">{trimmedLine}</h5>;
                } else if (trimmedLine.match(/^[•\-\*]\s+/)) {
                  return <div key={i} className="ms-4 mb-1">• {trimmedLine.substring(2)}</div>;
                } else if (trimmedLine === '') {
                  return <br key={i} />;
                }
                return <div key={i} className="mb-1">{trimmedLine}</div>;
              })}
            </div>
          );
        }

        // 8. Check for simple bullet lists
        if (content.match(/^[•\-\*]\s+/m)) {
          return (
            <div>
              {content.split('\n').map((line, i) => {
                const trimmedLine = line.trim();
                
                if (trimmedLine.match(/^[•\-\*]\s+/)) {
                  return <div key={i} className="mb-1">• {trimmedLine.substring(2)}</div>;
                } else if (trimmedLine === '') {
                  return <br key={i} />;
                } else if (trimmedLine) {
                  return <div key={i} className="mb-2 fw-semibold">{trimmedLine}</div>;
                }
                return null;
              }).filter(Boolean)}
            </div>
          );
        }

        // 9. Final fallback - enhanced plain text with smart formatting
        return (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {content.split('\n').map((line, i) => {
              const trimmedLine = line.trim();
              
              // Empty line
              if (!trimmedLine) {
                return <br key={i} />;
              }
              
              // Lines that look like titles (all caps or ending with colon)
              if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 2) {
                return <h6 key={i} className="fw-bold text-primary mt-3 mb-2">{trimmedLine}</h6>;
              }
              
              if (trimmedLine.endsWith(':') && !trimmedLine.includes(' ')) {
                return <h6 key={i} className="fw-bold text-secondary mt-2 mb-1">{trimmedLine}</h6>;
              }
              
              // Lines starting with bullet characters
              if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                return <div key={i} className="ms-4 mb-1">{trimmedLine}</div>;
              }
              
              // Lines starting with numbers
              if (trimmedLine.match(/^\d+\./)) {
                return <div key={i} className="mb-1 fw-semibold">{trimmedLine}</div>;
              }
              
              // Regular text
              return <div key={i} className="mb-2">{trimmedLine}</div>;
            })}
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
