'use client'

import { useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { convertFromRaw } from 'draft-js';
import parse from 'html-react-parser';



const SynthesisModal = ({ reviewData, loading, onDelete, selectedVoice }) => {
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

  // const speakWord = async (word) => {
  //   try {
  //       if (currentAudio) {
  //     currentAudio.pause();
  //     currentAudio.currentTime = 0;
  //   }
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

      const response = await fetch('/api/polly?language=es-ES', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: word,
          voice: selectedVoice,
          language: 'es-ES',
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
    router.push(`/dashboards/espagnol/edit/${id}`) // Navigate to the edit page with the item's ID
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
            <th>Palabra</th>
            <th>Sonido</th>
            <th>Etiquetas</th>
            <th>Calificación</th>
            <th>Síntesis</th>
            <th>Imagen</th>
            <th>Youglish</th>
            <th>Editar</th>
            <th>Acción</th>
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
                    {Array(item.note)
                      .fill(0)
                      .map((_star, idx) => (
                        <li className="icons-center" key={idx}>
                          <IconifyIcon icon="ri:star-fill" />
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
                    onClick={() => window.open(`https://youglish.com/pronounce/${item.word}/spanish`, '_blank')}>
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
                const isLikelyHTML = /<(html|body|table|tr|td|th|ul|ol|li|div|span|strong|em|p)[\s>]/i.test(selectedDescription);

                if (isLikelyHTML) {
                  try {
                    const cleanedHtml = selectedDescription.replace(
                      /<table/gi,
                      '<table class="table table-bordered table-striped text-center align-middle w-100 rounded shadow-sm mb-3"'
                    );
                    return <div className="table-responsive">{parse(cleanedHtml)}</div>;
                  } catch (err) {
                    console.warn("HTML parse failed, fallback to text:", err);
                  }
                }

                // 1) AI formatted (1. **Title**)
                if (selectedDescription.match(/^\d+\. \*\*.+\*\*/m)) {
                  const sections = [];
                  const lines = selectedDescription.split('\n');
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
                      <h5 className="fw-bold">{s.title}</h5>
                      <ul>
                        {s.content.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ));
                }

                // 2) Keyword sections like Synonyms:
                if (selectedDescription.match(/[A-Z][a-z]+:/)) {
                  const parts = selectedDescription.split(/(?=[A-Z][a-z]+:)/);
                  return parts.map((part, idx) => {
                    if (!part.includes(':')) return <p key={idx}>{part.trim()}</p>;
                    const [label, data] = part.split(':');
                    const items = data
                      .split(/•|\n|,/)
                      .map((x) => x.trim())
                      .filter((x) => x);

                    return (
                      <div key={idx} className="mb-3">
                        <h6 className="fw-bold">{label.trim()}</h6>
                        <ul>
                          {items.map((i, j) => (
                            <li key={j}>{i}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  });
                }

                // 3) Plain fallback
                return selectedDescription.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ));
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
