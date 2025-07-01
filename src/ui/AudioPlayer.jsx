import { useState, useEffect, useRef } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const AudioPlayer = ({ dialogues, voiceA, voiceB ,audioRef, isSpeaking, setIsSpeaking ,language}) => {
  const [playbackState, setPlaybackState] = useState('stopped'); // 'playing', 'paused', 'stopped'
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const playQueue = useRef([]);
  const playbackStateRef = useRef('stopped'); // Ref to track playback state for async operations
  console.log("playbackStateRef", playbackStateRef.current);
  console.log("playbackState", playbackState);
  // Keep the ref updated with latest state for async code
  useEffect(() => {
    playbackStateRef.current = playbackState;
  }, [playbackState]);

  // Function to prepare the dialogue queue
  const prepareQueue = () => {
    if (!dialogues || dialogues.length === 0) {
      console.warn('No dialogues provided to prepare queue');
      return [];
    }
    
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
    if (dialogues && dialogues.length > 0) {
      console.log('Preparing play queue with', dialogues.length, 'dialogues');
      playQueue.current = prepareQueue();
      console.log('Queue prepared with', playQueue.current.length, 'items');
    } else {
      console.log('No dialogues available to prepare queue');
      playQueue.current = [];
    }
    
    // Reset player state when dialogues change
    handleStop();
  }, [dialogues, voiceA, voiceB]);

  // Function to speak text
  const speak = async (text, voice) => {
    if (!text) {
      console.warn('No text provided to speak');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    setIsLoading(true);
    
    try {
      // Clean up previous audio if it exists
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      console.log(`Fetching audio for text: "${text.substring(0, 30)}..." with voice: ${voice}`);
      
      const response = await fetch('/api/polly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          language,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Polly API error:', response.status, errorText);
        throw new Error(`Failed to fetch Polly API: ${response.status} ${errorText}`);
      }

      const audioBlob = await response.blob();
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('Received empty audio blob from API');
      }
      
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      // Set up event listeners for audio
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      
      // Start progress tracking
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
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
          console.error('Audio playback error:', err);
          setError('Audio playback failed');
          reject(err);
        };
        
        // Explicitly handle play errors
        audio.play().then(() => {
          console.log('Audio playing successfully');
          setIsLoading(false);
        }).catch(error => {
          console.error('Failed to play audio:', error);
          setError('Failed to play audio');
          clearInterval(progressInterval.current);
          setIsLoading(false);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error in speak function:', error);
      setError(`Failed to play audio: ${error.message}`);
      setIsLoading(false);
      throw error;
    }
  };

  // Play from current position in queue
  const playFromPosition = async (startIndex = 0) => {
    // First, ensure we're in playing state
    setPlaybackState('playing');
    
    // Ensure we have a valid queue
    if (!playQueue.current || playQueue.current.length === 0) {
      console.error('Cannot play: queue is empty');
      setError('No dialogue content to play');
      setPlaybackState('stopped');
      return;
    }
    
    // Set initial dialogue index based on the first item we'll play
    if (startIndex < playQueue.current.length) {
      setCurrentDialogueIndex(playQueue.current[startIndex].dialogueIndex);
    }
    
    // Main playback loop
    let currentIndex = startIndex;
    while (currentIndex < playQueue.current.length) {
      // Break if we've been stopped or paused (using ref for accurate state)
    //   if (playbackStateRef.current !== 'playing') break;
      
      const currentItem = playQueue.current[currentIndex];
      console.log(`Playing item ${currentIndex}: ${currentItem.speaker} - ${currentItem.text.substring(0, 20)}...`);
      
      try {
        await speak(currentItem.text, currentItem.voice);
        
        // Only increment if we're still playing (not stopped or paused)
        if (playbackStateRef.current === 'playing') {
          currentIndex++;
          
          // Update dialogue index for the next item if available
          if (currentIndex < playQueue.current.length) {
            setCurrentDialogueIndex(playQueue.current[currentIndex].dialogueIndex);
          }
        } else {
          // We were paused or stopped during playback
          break;
        }
      } catch (error) {
        console.error('Playback error:', error);
        setPlaybackState('stopped');
        break;
      }
    }
    
    // If we completed the queue
    if (currentIndex >= playQueue.current.length && playbackStateRef.current === 'playing') {
      console.log('Playback complete');
      setPlaybackState('stopped');
      setCurrentDialogueIndex(0);
    }
  };

  // Handle play button click
  const handlePlay = () => {
    // Clear any previous errors
    setError(null);
    
    if (isLoading) {
      console.log('Ignoring play request while loading audio');
      return;
    }
    
    if (playbackState === 'paused' && audioRef.current) {
      // Resume current audio
      console.log('Resuming paused audio');
      audioRef.current.play().catch(err => {
        console.error('Failed to resume audio:', err);
        setError('Failed to resume playback');
      });
      setPlaybackState('playing');
      setIsSpeaking(true);
      
      // Restart progress tracking
      progressInterval.current = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          setCurrentTime(audioRef.current.currentTime);
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      }, 100);
    } else {
      // Start fresh from beginning or continue from last position
      let startIndex = 0;
      
      // If paused, find the dialogue position
      if (playbackState !== 'stopped') {
        startIndex = playQueue.current.findIndex(item => item.dialogueIndex === currentDialogueIndex);
        if (startIndex < 0) startIndex = 0;
      }
      
      // Ensure playQueue is ready before starting
      if (playQueue.current && playQueue.current.length > 0) {
        console.log('Starting playback from index:', startIndex);
        playFromPosition(startIndex);
      } else {
        console.error('Play queue is empty, cannot start playback');
        setError('No dialogue content to play');
      }
    }
  };

  // Handle pause button click
  const handlePause = () => {
    setPlaybackState('paused');
    setIsSpeaking(false); // ✅ Re-enable speaker buttons when paused

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
    setIsSpeaking(false); // ✅ Re-enable speaker buttons when stopped

    setCurrentDialogueIndex(0);
    setCurrentTime(0);
    setProgress(0);
    setError(null);
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
      const nextIndex = currentDialogueIndex + 1;
      setCurrentDialogueIndex(nextIndex);
      setPlaybackState('playing');
      console.log('Playing next dialogue:', nextIndex);
  
      // Automatically play the next dialogue
      const nextQueueIndex = playQueue.current.findIndex(
        (item) => item.dialogueIndex === nextIndex
      );
      if (nextQueueIndex >= 0) {
        playFromPosition(nextQueueIndex);
      }
    }
  };

  // Previous dialogue
  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      const prevIndex = currentDialogueIndex - 1;
      setCurrentDialogueIndex(prevIndex);
      setPlaybackState('playing');
      console.log('Playing previous dialogue:', prevIndex);
  
      // Automatically play the previous dialogue
      const prevQueueIndex = playQueue.current.findIndex(
        (item) => item.dialogueIndex === prevIndex
      );
      if (prevQueueIndex >= 0) {
        playFromPosition(prevQueueIndex);
      }
    }
  };

  return (
    <div className="audio-player bg-white rounded shadow p-3 mb-4">
      {error && (
        <div className="alert alert-danger py-2 mb-3" role="alert">
          <small>{error}</small>
        </div>
      )}
      
      <div className="d-flex align-items-center mb-2">
        <button 
          className="btn btn-outline-secondary me-2"
          onClick={handlePrevious}
          disabled={currentDialogueIndex === 0 || isLoading}
        >
          <IconifyIcon icon="material-symbols:skip-previous" className="align-middle fs-18" />
        </button>

        {playbackState === 'playing' ? (
          <button className="btn btn-warning me-2" onClick={handlePause} disabled={isLoading}>
            <IconifyIcon icon="material-symbols:pause" className="align-middle fs-18" />
          </button>
        ) : (
          <button className="btn btn-success me-2" onClick={handlePlay} disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <IconifyIcon icon="material-symbols:play-arrow" className="align-middle fs-18" />
            )}
          </button>
        )}

        <button className="btn btn-outline-danger me-2" onClick={handleStop} disabled={isLoading}>
          <IconifyIcon icon="material-symbols:stop" className="align-middle fs-18" />
        </button>

        <button 
          className="btn btn-outline-secondary"
          onClick={handleNext}
          disabled={currentDialogueIndex >= dialogues.length - 1 || isLoading}
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
            disabled={isLoading}
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
          Dialogue {currentDialogueIndex + 1} of {dialogues ? dialogues.length : 0}
        </small>
      </div>
    </div>
  );
};

export default AudioPlayer;