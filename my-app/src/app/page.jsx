"use client"; // Make sure you're using a client component
import Leaves from "./Leaves/Leaves.jsx";
import "./page.css";
import level1 from "./images/level1.png"
import level2 from "./images/level2.png"
import level3 from "./images/level3.png"
import level4 from "./images/level4.png"
import level5 from "./images/level5.png"
import Image from 'next/image';
import React, { useRef, useState } from "react"; // Import useState here
import Popup from './Level1PopUp/level1popup.jsx';
import TopBar from './Topbar.jsx';

function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to show or hide the popup
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const audioRef = useRef(null);

  const play_bg_music = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stop_bg_music = () => {
    audioRef.current.pause();
  }

  return (
    <div>
      <TopBar />
      <div className="background-container">
        <Leaves />
        <div className="level1-container">
          <Image 
            onClick={togglePopup} 
            src={level1} 
            alt="Level 1" 
            layout="fill" 
            objectFit="contain" 
          />
        </div>
        <div className="level2-container">
          <Image src={level2} alt="Level 2" layout="fill" objectFit="contain" />
        </div>
        <div className="level3-container">
          <Image src={level3} alt="Level 3" layout="fill" objectFit="contain" />
        </div>
        <div className="level4-container">
          <Image src={level4} alt="Level 4" layout="fill" objectFit="contain" />
        </div>
        <div className="level5-container">
          <Image src={level5} alt="Level 5" layout="fill" objectFit="contain" />
        </div>
        {isPopupVisible && <Popup onClose={togglePopup} />} 
        <audio ref={audioRef}>
          <source src="/audio/bg_music.mp3" type="audio/mp3" />        Your browser does not support the audio element.
      </audio>
      <button className='play-bg-music-button' onClick={play_bg_music}>
          <Image 
            src='/images/play_bg_music.png'  // Use absolute path starting from /public
            alt="Play Background Music"
            width={50}   // Set a width
            height={50}  // Set a height
          />
        </button>
        <button className='stop-bg-music-button' onClick={stop_bg_music}>
          <Image 
            src='/images/stop_bg_music.png'  // Use absolute path starting from /public
            alt="Stop Background Music"
            width={50}   // Set a width
            height={50}  // Set a height
          />
        </button>
      </div>
    </div>
  );
}

export default Home;
