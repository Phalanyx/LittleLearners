'use client'; // Ensure this is a client component
import React, { useState, useEffect } from 'react';
import LevelTwoWords from './LevelTwoWords';
import LevelTwoImages from './LevelTwoImages';

function Page() {
  const [words, setWords] = useState(['', '', '']);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/leveltwoEndpoint'); // Replace with your actual API endpoint
        const data = await response.json();
        setWords(Object.values(data)); // Set the words state with the fetched data
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };
    fetchWords(); // Call the fetch function
  }, []); 
  const [isCorrect, setIsCorrect] = useState(false); // Track the correctness state

  const handleSubmit = () => {
    if (isCorrect) {
        var newWords = fetch('/api/leveltwoEndpoint')
          .then(response => response.json())
          .then(data => setWords(Object.values(data)))
          .catch(error => console.error('Error fetching new words:', error));
        newWords.then((words) => {
            console.log(words)
            setIsCorrect(false)
        }); // Reset correctness state
    }
    
  };

  const handleCorrectChange = (correct) => {
    setIsCorrect(correct); // Update the correctness state
  };

  return (
    <div className="flex flex-col">
      <LevelTwoImages />
      <button onClick={handleSubmit}>Submit</button>
      <LevelTwoWords words={words} onCorrectChange={handleCorrectChange} />
      <div>
        {isCorrect ? 'Correct!' : 'Not Correct'}
      </div>
    </div>
  );
}

export default Page;
