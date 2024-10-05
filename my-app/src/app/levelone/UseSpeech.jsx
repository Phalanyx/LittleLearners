import React, { useEffect, useRef, useState } from 'react';
// Record voice 


const useSpeech = (options) => {   
        const [isListening, setListening] = useState(false);
        const [transcription, setTranscription] = useState('');
        const recRef = useRef(null);
        useEffect(() => {
            if (!'webkitSpeechRecognition' in window) {
                console.log('Browser does not support speech recognition');
                return;
            }
            recRef.current = new webkitSpeechRecognition();
            const rec = recRef.current;
            rec.interimResults = options.interimResults || true;
            rec.interimResults = options.interimResults || true;
            rec.lang = options.lang || 'en-US';
            rec.continuous = options.continuous || false;

            if ("webkitSpeechGrammarList" in window) {
                const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | ! | ? | ; | :;"
                const recognition = new window.webkitSpeechGrammarList();
                recognition.addFromString(grammar, 1);
                rec.grammars = recognition;
            }

            rec.onresult = (event) => {
                let text=""
                for (let i = 0; i < event.results.length; i++) {
                    text += event.results[i][0].transcript;
                }
                setTranscription(text);
            }
            rec.onerror = (event) => {
                console.log('Speech Recognition error', event);
            }

            rec.onend = () => {
                setListening(false);
                setTranscription("");   
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
    return { start, stop, transcription, isListening }
}

export default useSpeech;
