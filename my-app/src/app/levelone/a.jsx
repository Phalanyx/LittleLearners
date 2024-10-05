import React, { useRef } from 'react';
import "./a.css"

function AudioPlayer() {
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  return (
    <div>
      <audio ref={audioRef}>
        <source src="/audio/SayLetterA.mp3" type="audio/mp3" />        Your browser does not support the audio element.
     </audio>
      <button className='play-sound-button' onClick={playSound}></button>
      <button className='pause-sound-button' onClick={stopSound}></button>
    </div>
  );
}

export default AudioPlayer;