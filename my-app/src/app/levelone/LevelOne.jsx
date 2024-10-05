import React, { useState } from 'react'
import useSpeech from './UseSpeech'
const LevelOne = () => {
  const [textInput, setTextInput] = useState('hello');
  const { start, stop, transcription, isListening } = useSpeech({continuous: true});

  const startStopListening = () => {
    isListening ? stop() : start();
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <button 
        onClick={() => {startStopListening()}} 
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px', 
          fontSize: '16px', 
          cursor: 'pointer', 
          backgroundColor: isListening ? '#ff4d4d' : '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        {isListening ? 'Stop' : 'Start'}
      </button>
      <textarea
        value={isListening ? textInput + (transcription.length ? (textInput.length ? ' ' : '') + transcription : '') : textInput}
        disabled={isListening}
        onChange={(e) => setTextInput(e.target.value)}
        style={{ 
          width: '100%', 
          height: '200px', 
          padding: '10px', 
          fontSize: '16px', 
          borderRadius: '5px', 
          border: '1px solid #ccc', 
          boxSizing: 'border-box' 
        }}
      />
    </div>
  )
}

export default LevelOne