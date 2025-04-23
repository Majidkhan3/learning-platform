'use client';

import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const SynthesisModal = ({ reviewData, loading, onDelete, selectedVoice }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const router = useRouter();

  const handleSynthesisClick = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDescription('');
    setSelectedImage('');
  };

  const speakWord = async (word) => {
    try {
      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: word,
          voice: selectedVoice,
          language: 'es-ES', // Adjust language as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Polly API');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error fetching Polly API:', error);
    }
  };

  const handleEditClick = (id) => {
    router.push(`/dashboards/espagnol/edit/${id}`); // Navigate to the edit page with the item's ID
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
                  <Button
                    variant="light"
                    size="sm"
                    className="p-1"
                    onClick={() => speakWord(item.word)}
                  >
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
                  <Button
                    variant="soft-info"
                    size="sm"
                    onClick={() => handleSynthesisClick(item.summary)}
                  >
                    <IconifyIcon icon="ri:file-text-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-secondary"
                    size="sm"
                    onClick={() => handleImageClick(item.image)}
                  >
                    <IconifyIcon icon="ri:image-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-primary"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://youglish.com/pronounce/${item.word}/spanish`,
                        '_blank'
                      )
                    }
                  >
                    <IconifyIcon icon="ri:youtube-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-warning"
                    size="sm"
                    onClick={() => handleEditClick(item._id)}
                  >
                    <IconifyIcon icon="ri:edit-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-danger"
                    size="sm"
                    onClick={() => onDelete(item._id)}
                  >
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
          <Modal.Title>
            {selectedImage ? 'Word Image' : 'Word Synthesis'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage ? (
            <img src={selectedImage} alt="Word Illustration" className="img-fluid" />
          ) : (
            selectedDescription
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SynthesisModal;