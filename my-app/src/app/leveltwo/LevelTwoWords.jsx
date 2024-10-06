'use client';
import React, { useEffect, useState } from 'react';
import { createSwapy } from 'swapy';
import './leveltwoWords.css';

const DEFAULT_WORDS = {
  'a': 'apple',
  'b': 'banana',
  'c': 'carrot',
};
function shuffleObject(obj) {
  // Convert the object into an array of key-value pairs
  const entries = Object.entries(obj);
  
  // Shuffle the array of entries
  const shuffledEntries = entries.sort(() => 0.5 - Math.random());

  // Convert the shuffled array back into an object
  const shuffledObj = Object.fromEntries(shuffledEntries);

  return shuffledObj;
}

const DEFAULT = {
  '1': 'a',
  '2': 'c',
  '3': 'd',
};


const CORRECT = {
  '1': 'a',
  '2': 'c',
  '3': 'd',
};

function A() {
  return (
    <div className="item a" data-swapy-item="a">
      <div className="handle" data-swapy-handle></div>
      <div>{DEFAULT_WORDS['a']}</div>
    </div>
  );
}

function C() {
  return (
    <div className="item a" data-swapy-item="c">
      <div>{DEFAULT_WORDS['b']}</div>
    </div>
  );
}

function D() {
  return (
    <div className="item a" data-swapy-item="d">
      <div>{DEFAULT_WORDS['c']}</div>
    </div>
  );
}

function getItemById(itemId = null) {
  switch (itemId) {
    case 'a':
      return <A />;
    case 'c':
      return <C />;
    case 'd':
      return <D />;
    default:
      return <div className="item" data-swapy-item="null"></div>;
  }
}

function LevelTwoImage(props) {
  const [correct, setCorrect] = useState(false);

  if (props.words) {
    DEFAULT_WORDS['a'] = props.words[0];
    DEFAULT_WORDS['b'] = props.words[1];
    DEFAULT_WORDS['c'] = props.words[2];
  }
  const slotItems = DEFAULT;

  useEffect(() => {
    const container = document.querySelector('.container');
    const swapy = createSwapy(container, {
      swapMode: 'hover',
    });

    swapy.onSwap(({ data }) => {
      localStorage.setItem('slotItem', JSON.stringify(data.object));
    });

    swapy.onSwapEnd(({ data, hasChanged }) => {
      const isCorrect =
        data.object['1'] === CORRECT['1'] &&
        data.object['2'] === CORRECT['2'];

      setCorrect(isCorrect);
      props.onCorrectChange(isCorrect); // Send correct state to the parent
    });

    swapy.onSwapStart(() => {});

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems['1'])}
        </div>
        <div className="slot a" data-swapy-slot="2">
          {getItemById(slotItems['2'])}
        </div>
        <div className="slot a" data-swapy-slot="3">
          {getItemById(slotItems['3'])}
        </div>
      </div>
    </div>
  );
}

export default LevelTwoImage;
