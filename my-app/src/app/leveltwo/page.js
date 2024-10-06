'use client'; // Ensure this is a client component
import React, { useRef, useState, useEffect } from 'react';
import LevelTwoWords from './LevelTwoWords';
import LevelTwoImages from './LevelTwoImages';
import './page.css'; // Import the CSS file

function Page() {
  const [words, setWords] = useState(['', '', '']);
  const [links, setLinks] = useState(['', '', '']);
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/leveltwoEndpoint'); 
        const data = await response.json();
        setWords(data.randomPairs); 
        setLinks(data.links);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };
    fetchWords()
    ; 
  }, []); 

  const audioRef = useRef(null);

  const [isCorrect, setIsCorrect] = useState(false); // Track the correctness state


  async function add() {
    const response = await fetch('/api/addCoin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1 }),
    });
}

  const handleSubmit = () => {
    if (isCorrect) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      add();
      var newWords = fetch('/api/leveltwoEndpoint')
        .then(response => response.json())
        .then(data => {
          setWords(data.randomPairs)
          setLinks(data.links)
    })
          .catch(error => console.error('Error fetching new words:', error));
        newWords.then((words) => {
            setIsCorrect(false)
        }); // Reset correctness state
    }
    
  };

  const handleCorrectChange = (correct) => {
    setIsCorrect(correct); // Update the correctness state
  };



  return (
    <div className="page-container">
      <LevelTwoImages className="" links={links}/>
      <LevelTwoWords words={words} onCorrectChange={handleCorrectChange} />
      <button onClick={handleSubmit} className='submit-button'>Submit</button>
      <audio ref={audioRef}>
        <source src="/audio/correct.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default Page;
