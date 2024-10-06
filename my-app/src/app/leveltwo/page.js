'use client'; // Ensure this is a client component
import React, { useState, useEffect } from 'react';
import LevelTwoWords from './LevelTwoWords';
import LevelTwoImages from './LevelTwoImages';

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
  const [isCorrect, setIsCorrect] = useState(false); // Track the correctness state

  const handleSubmit = () => {
    if (isCorrect) {
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
    <div className="flex flex-col border-2 border-green-500">
      <LevelTwoImages className="" links={links}/>
      <button onClick={handleSubmit}>Submit</button>
      <LevelTwoWords words={words} onCorrectChange={handleCorrectChange} />
      <div>
        {isCorrect ? 'Correct!' : 'Not Correct'}
        {words}
      </div>
    </div>
  );
}

export default Page;
