import "./Lev1Game1.css";
import React, { useState } from 'react';
import LevelOne from "@/app/levelone/LevelOne";
import AudioPlayer from "@/app/levelone/a";
import Image from 'next/image'; // Importing the Image component from Next.js
import TopBar from '@/app/Topbar.jsx';
import '@/app/Topbar.css'


function Lev1Game1() {
    const [currentLetter, setCurrentLetter] = useState('/images/letterA.png'); // State to hold the current letter image

    // Function to change letter from A to B
    const handleGoodJob = () => {
        setCurrentLetter('/images/letterB.png');  // Change the letter to B when Good Job is triggered
    };

    return (
        <div>
            <TopBar />
            <div className="background-container">
                <Image
                    src="/images/goldcircle.png"
                    className="gold-circle"
                    width={300}
                    height={300}
                />
                
                {/* Dynamically change the letter image based on state */}
                <Image 
                    src={currentLetter}
                    className="letter-A"
                    width={200}
                    height={200}
                />
                
                <Image
                    src="/images/goldcircle.png"
                    className="gold-circle1"
                    width={200}
                    height={200}
                />
                <Image
                    src="/images/goldcircle.png"
                    className="gold-circle2"
                    width={200}
                    height={200}
                />

                {/* Pass the handleGoodJob function to LevelOne as a prop */}
                <LevelOne onGoodJob={handleGoodJob} />
                <AudioPlayer />
            </div>
        </div>
    );
}

export default Lev1Game1;
