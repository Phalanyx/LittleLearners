import React, { useEffect, useRef, useState } from 'react';

const useSpeech = (options) => {   
  const [isListening, setListening] = useState(false);
  const [latestWord, setLatestWord] = useState(''); // Capture only the latest word
  const recRef = useRef(null);

  useEffect(() => {
    if (!'webkitSpeechRecognition' in window) {
      console.log('Browser does not support speech recognition');
      return;
    }

    recRef.current = new webkitSpeechRecognition();
    const rec = recRef.current;
    rec.interimResults = options.interimResults || true;
    rec.lang = options.lang || 'en-US';
    rec.continuous = options.continuous || false;

    rec.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      // Split text into words and get the last word
      const words = text.trim().split(' ');
      const lastWord = words[words.length - 1]; 
      
      setLatestWord(lastWord); // Store the latest word
    }

    rec.onerror = (event) => {
      console.log('Speech Recognition error', event);
    }

    rec.onend = () => {
      setListening(false);
      setLatestWord("");   
    }

    return () => {
      rec.stop()
    }
  }, [])

  const start = () => {
    if (recRef.current && !isListening) {
      recRef.current.start();
      setListening(true);
    }
  }

  const stop = () => {
    if (recRef.current && isListening) {
      recRef.current.stop();
      setListening(false);
    }
  }

  return { start, stop, latestWord, isListening } // Returning latestWord
}

export default useSpeech;
