'use client';

import React, { useRef, useState, useEffect } from 'react';
import LevelTwoWords from './LevelTwoWords';
import LevelTwoImages from './LevelTwoImages';
import './page.css'; // Import the CSS file
import TopBar from '../Topbar';
import '../Topbar.css'

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
    fetchWords(); 
  }, []); 

  const audioRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(false); 

  async function add() {
    await fetch('/api/addCoin', {
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
        audioRef.current.play(); // Play audio
      }
      add(); // Perform the POST request

      // Reload the page after actions are done
      setTimeout(() => {
        window.location.reload(); // Reload the page after a short delay
      }, 2000); // Add a slight delay for user experience

      
    }
  };

  const handleCorrectChange = (correct) => {
    setIsCorrect(correct); // Update the correctness state
  };

  return (
    <div className="page-container">
      <TopBar />
      <LevelTwoImages className="" links={links} />
      <LevelTwoWords words={words} onCorrectChange={handleCorrectChange} getCorrect={isCorrect} />
      <button onClick={handleSubmit} className='submit-button'>Submit</button>
      <audio ref={audioRef}>
        <source src="/audio/correct.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default Page;
