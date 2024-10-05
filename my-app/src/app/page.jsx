"use client"; // Make sure you're using a client component
import Leaves from "./Leaves/Leaves.jsx";
import "./page.css";
import level1 from "./images/level1.png"
import level2 from "./images/level2.png"
import level3 from "./images/level3.png"
import level4 from "./images/level4.png"
import level5 from "./images/level5.png"
import Image from 'next/image';
import React, { useState } from "react"; // Import useState here
import Popup from './Level1PopUp/level1popup.jsx';
import LevelOne from "./levelone/LevelOne.jsx";

function Home() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to show or hide the popup
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

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
      <LevelOne/>
      {isPopupVisible && <Popup onClose={togglePopup} />} 
    </div>
  );
}

export default Home;
