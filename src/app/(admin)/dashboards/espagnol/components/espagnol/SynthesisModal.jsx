'use client';

import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Modal } from 'react-bootstrap';

const SynthesisModal = ({ reviewData, loading, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [voiceType, setVoiceType] = useState('female'); // 'male' or 'female'

  const handleSynthesisClick = (description) => {
    setSelectedDescription(description);
    setShowModal(true);
  };

  const handleImageClick = (image) => {
    console.log(image,"image);");
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDescription('');
    setSelectedImage('');
  };

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      const voices = window.speechSynthesis.getVoices();
      let preferredVoice;
      if (voiceType === 'female') {
        preferredVoice = voices.find((voice) => voice.name.includes('Female') || voice.name.includes('Zira'));
      } else {
        preferredVoice = voices.find((voice) => voice.name.includes('Male') || voice.name.includes('David'));
      }
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const toggleVoice = () => {
    setVoiceType((prev) => (prev === 'female' ? 'male' : 'female'));
  };

  return (
    <>
      <table className="table align-middle text-nowrap table-hover table-centered border-bottom mb-0">
        <thead className="bg-light-subtle">
          <tr>
            <th>Word</th>
            <th>
              Sound
              <Button
                variant="link"
                size="sm"
                onClick={toggleVoice}
                title={`Switch to ${voiceType === 'female' ? 'male' : 'female'} voice`}>
                <IconifyIcon
                  icon={voiceType === 'female' ? 'ri:woman-line' : 'ri:man-line'}
                  className="align-middle fs-14 ms-1"
                />
              </Button>
            </th>
            <th>Tags</th>
            <th>Rating</th>
            <th>Synthesis</th>
            <th>Picture</th>
            <th>Youglish</th>
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
                  <Button
                    variant="soft-secondary"
                    size="sm"
                    onClick={() => handleImageClick(item.image)}>
                    <IconifyIcon icon="ri:image-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button variant="soft-primary" size="sm" onClick={() => window.open(`https://youglish.com/pronounce/${item.word}/spanish`, '_blank')}>
                    <IconifyIcon icon="ri:youtube-line" className="align-middle fs-18" />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="soft-danger"
                    size="sm"
                    onClick={() => onDelete(item._id)}>
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