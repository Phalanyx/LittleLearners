import React, { useState, useRef, useEffect } from 'react';
import useSpeech from './UseSpeech';

const LevelOne = ({ onGoodJob }) => {
  const { start, stop, latestWord, isListening } = useSpeech({ continuous: true });
  const [check, setCheck] = useState(false);
  const goodJobAudioRef = useRef(null);  // Reference to the "good-job" audio
  const tryAgainAudioRef = useRef(null);  // Reference to the "try-again" audio

  // Function to start or stop listening
  const startStopListening = () => {
    isListening ? stop() : start();
  };

  // Function to handle when audio starts playing (stop listening)
  const handleAudioPlay = () => {
    if (isListening) {
      stop();  // Stop listening while audio is playing
    }
  };

  // Function to handle when audio finishes playing (resume listening)
  const handleAudioEnd = () => {
    start();  // Resume listening after audio ends
  };
  async function add() {
    const response = await fetch('/api/addCoin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1 }),
    });
    const data = await response.json()
    console.log(data);
}
  // Play good-job audio and stop listening
  const playGoodJobSound = () => {
    if (goodJobAudioRef.current) {
      handleAudioPlay();
      goodJobAudioRef.current.play();
    }
  };

  // Play try-again audio and stop listening
  const playTryAgainSound = () => {
    if (tryAgainAudioRef.current) {
      handleAudioPlay();
      tryAgainAudioRef.current.play();
    }
  };

  // Check the latest word spoken
  if (latestWord) {
    console.log("Latest word spoken:", latestWord.trim());
    if (latestWord.trim().toLowerCase() === 'a' || latestWord.trim().toLowerCase() === 'hey') {
      console.log("Good job");
      playGoodJobSound();

      // Call the onGoodJob function passed as a prop to change the letter image
      if (onGoodJob) {
        if (!check) {
          add();
          setCheck(true);
        }
        onGoodJob();
      }
    } else {
      console.log("Try again");
      playTryAgainSound();
    }
  }

  // Add event listeners for when the audio ends (to resume listening)
  useEffect(() => {
    const goodJobAudio = goodJobAudioRef.current;
    const tryAgainAudio = tryAgainAudioRef.current;

    if (goodJobAudio && tryAgainAudio) {
      // Resume listening when "good-job" audio ends
      goodJobAudio.addEventListener('ended', handleAudioEnd);
      // Resume listening when "try-again" audio ends
      tryAgainAudio.addEventListener('ended', handleAudioEnd);
    }

    // Clean up event listeners on unmount
    return () => {
      if (goodJobAudio) goodJobAudio.removeEventListener('ended', handleAudioEnd);
      if (tryAgainAudio) tryAgainAudio.removeEventListener('ended', handleAudioEnd);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <button 
        onClick={() => { startStopListening() }} 
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px', 
          fontSize: '16px', 
          cursor: 'pointer', 
          backgroundColor: isListening ? '#ff4d4d' : '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          zIndex: 300,
        }}
      >
        {isListening ? 'Stop' : 'Start'}
      </button>

      {/* Audio element for "good-job.mp3" */}
      <audio ref={goodJobAudioRef}>
        <source src="/audio/good-job.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio element for "try-again.mp3" */}
      <audio ref={tryAgainAudioRef}>
        <source src="/audio/try-again.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default LevelOne;
