import { useState, useEffect, useRef } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const AudioPlayer = ({ dialogues, voiceA, voiceB }) => {
  const [playbackState, setPlaybackState] = useState('stopped'); // 'playing', 'paused', 'stopped'
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const playQueue = useRef([]);

  // Function to prepare the dialogue queue
  const prepareQueue = () => {
    const queue = [];
    dialogues.forEach((dialogue, dialogueIndex) => {
      if (dialogue.a) {
        queue.push({ text: dialogue.a, voice: voiceA, dialogueIndex, speaker: 'A' });
      }
      if (dialogue.b) {
        queue.push({ text: dialogue.b, voice: voiceB, dialogueIndex, speaker: 'B' });
      }
    });
    return queue;
  };

  // Reset the playback when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Update the queue when dialogues or voices change
  useEffect(() => {
    playQueue.current = prepareQueue();
  }, [dialogues, voiceA, voiceB]);

  // Function to speak text
  const speak = async (text, voice) => {
    if (!text) return;
    
    try {
      // Clean up previous audio if it exists
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          language: 'es-ES',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Polly API');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      // Set up event listeners for audio
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      
      // Start progress tracking
      progressInterval.current = setInterval(() => {
        if (audio && !audio.paused) {
          setCurrentTime(audio.currentTime);
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      }, 100);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          clearInterval(progressInterval.current);
          resolve();
        };
        audio.onerror = (err) => {
          clearInterval(progressInterval.current);
          reject(err);
        };
        audio.play().catch(error => {
          clearInterval(progressInterval.current);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error in speak function:', error);
      throw error;
    }
  };

  // Play from current position in queue
  const playFromPosition = async (startIndex = 0) => {
    setPlaybackState('playing');
    
    let currentIndex = startIndex;
    while (currentIndex < playQueue.current.length && playbackState !== 'stopped') {
      const currentItem = playQueue.current[currentIndex];
      
      // Update the dialogue index display
      setCurrentDialogueIndex(currentItem.dialogueIndex);
      
      try {
        // If state changed to paused during await, break the loop
        if (playbackState === 'paused') break;
        
        await speak(currentItem.text, currentItem.voice);
        currentIndex++;
      } catch (error) {
        console.error('Playback error:', error);
        setPlaybackState('stopped');
        break;
      }
    }
    
    // If we completed the queue
    if (currentIndex >= playQueue.current.length) {
      setPlaybackState('stopped');
      setCurrentDialogueIndex(0);
    }
  };

  // Handle play button click
  const handlePlay = () => {
    if (playbackState === 'paused' && audioRef.current) {
      // Resume current audio
      audioRef.current.play();
      setPlaybackState('playing');
      
      // Restart progress tracking
      progressInterval.current = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          setCurrentTime(audioRef.current.currentTime);
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      }, 100);
    } else {
      // Start fresh or continue from last position
      const startIndex = playbackState === 'stopped' ? 0 : 
        playQueue.current.findIndex(item => item.dialogueIndex === currentDialogueIndex);
      playFromPosition(Math.max(0, startIndex));
    }
  };

  // Handle pause button click
  const handlePause = () => {
    setPlaybackState('paused');
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Handle stop button click
  const handleStop = () => {
    setPlaybackState('stopped');
    setCurrentDialogueIndex(0);
    setCurrentTime(0);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  // Format time display
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekPosition = parseFloat(e.target.value);
    setProgress(seekPosition);
    
    if (audioRef.current) {
      const seekTime = (seekPosition / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Next dialogue
  const handleNext = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
      
      // If we're playing, stop current and play next
      if (playbackState === 'playing') {
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }
        
        // Find the index in queue corresponding to the next dialogue
        const nextIndex = playQueue.current.findIndex(
          item => item.dialogueIndex === currentDialogueIndex + 1
        );
        if (nextIndex >= 0) {
          playFromPosition(nextIndex);
        }
      }
    }
  };

  // Previous dialogue
  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(prev => prev - 1);
      
      // If we're playing, stop current and play previous
      if (playbackState === 'playing') {
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }
        
        // Find the index in queue corresponding to the previous dialogue
        const prevIndex = playQueue.current.findIndex(
          item => item.dialogueIndex === currentDialogueIndex - 1
        );
        if (prevIndex >= 0) {
          playFromPosition(prevIndex);
        }
      }
    }
  };

  return (
    <div className="audio-player bg-white rounded shadow p-3 mb-4">
      <div className="d-flex align-items-center mb-2">
        <button 
          className="btn btn-outline-secondary me-2"
          onClick={handlePrevious}
          disabled={currentDialogueIndex === 0}
        >
          <IconifyIcon icon="material-symbols:skip-previous" className="align-middle fs-18" />
        </button>

        {playbackState === 'playing' ? (
          <button className="btn btn-warning me-2" onClick={handlePause}>
            <IconifyIcon icon="material-symbols:pause" className="align-middle fs-18" />
          </button>
        ) : (
          <button className="btn btn-success me-2" onClick={handlePlay}>
            <IconifyIcon icon="material-symbols:play-arrow" className="align-middle fs-18" />
          </button>
        )}

        <button className="btn btn-outline-danger me-2" onClick={handleStop}>
          <IconifyIcon icon="material-symbols:stop" className="align-middle fs-18" />
        </button>

        <button 
          className="btn btn-outline-secondary"
          onClick={handleNext}
          disabled={currentDialogueIndex >= dialogues.length - 1}
        >
          <IconifyIcon icon="material-symbols:skip-next" className="align-middle fs-18" />
        </button>
      </div>

      <div className="d-flex align-items-center mb-2">
        <span className="me-2 text-nowrap">{formatTime(currentTime)}</span>
        <div className="w-100 position-relative" style={{ height: '4px' }}>
          <input
            type="range"
            className="position-absolute w-100 h-100"
            style={{ opacity: 0, cursor: 'pointer', zIndex: 2 }}
            min="0"
            max="100"
            step="1"
            value={progress}
            onChange={handleSeek}
          />
          <div className="position-absolute w-100 bg-light rounded" style={{ height: '4px' }}>
            <div 
              className="bg-primary rounded" 
              style={{ width: `${progress}%`, height: '100%' }}
            ></div>
          </div>
        </div>
        <span className="ms-2 text-nowrap">{formatTime(duration)}</span>
      </div>

      <div className="text-center">
        <small className="text-muted">
          Dialogue {currentDialogueIndex + 1} of {dialogues.length}
        </small>
      </div>
    </div>
  );
};

export default AudioPlayer;