"use client"; // Ensure client-side rendering
import Leaves from "./Leaves/Leaves.jsx";
import "./page.css";
import bookImage from "./images/book.png"
import level1 from "./images/level1.png";
import level2 from "./images/level2.png";
import level3 from "./images/level3.png";
import level4 from "./images/level4.png";
import level5 from "./images/level5.png";
import Image from 'next/image';
import React, { useRef, useState } from "react"; // Import useState here
import Popup from './Level1PopUp/level1popup.jsx';
import Popup2 from "./Level2PopUp/level2popup.jsx";
import TopBar from './Topbar.jsx';

function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupVisible2, setPopupVisible2] = useState(false);

  // Function to show or hide the popup
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const togglePopup2 = () => {
    setPopupVisible2(!isPopupVisible2);
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

  const handlelibraryClick = () =>{
    window.location.href = 'book'
  }

  return (
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
      {isPopupVisible && <Popup onClose={togglePopup} />} 

      <div className="level2-container">
      <Image 
          onClick={togglePopup2} 
          src={level2} 
          alt="Level 2" 
          layout="fill" 
          objectFit="contain" 
        />
      </div>
      {isPopupVisible2 && <Popup2 onClose={togglePopup2} />} 

      <div className="level3-container">
        <Image src={level3} alt="Level 3" layout="fill" objectFit="contain" />
      </div>
      <div className="level4-container">
        <Image src={level4} alt="Level 4" layout="fill" objectFit="contain" />
      </div>
      <div className="level5-container">
        <Image src={level5} alt="Level 5" layout="fill" objectFit="contain" />
      </div>

      <audio ref={audioRef}>
        <source src="/audio/bg_music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Music control buttons */}
      <button className='play-bg-music-button' onClick={play_bg_music}>
        <Image 
          src='/images/play_bg_music.png'  // Use absolute path starting from /public
          alt="Play Background Music"
          width={50}
          height={50}
        />
      </button>
      <button className='stop-bg-music-button' onClick={stop_bg_music}>
        <Image 
          src='/images/stop_bg_music.png'  // Use absolute path starting from /public
          alt="Stop Background Music"
          width={50}
          height={50}
        />
        </button>
      <button className='book_button' onClick= {() => handlelibraryClick()}>
        <Image
        src={bookImage}
        width={50}
        height={50}
        />
        </button>
      <button className='book_button' onClick= {() => handlelibraryClick()}>
        <Image
        src={bookImage}
        width={50}
        height={50}
        />
      </button>
    </div>
  );
}

export default Home;
