import React from 'react';
import './level2popup.css'; // Ensure the path is correct
import gameImage from '../images/game2.png'; // Path to your image
import Image from 'next/image';

function Popup2({ onClose }) {
    // Function to handle image click
    const handleGameClick = (index) => {
        if (index === 0) {
            // Navigate to /Lev1Game1 when the first image is clicked
            window.location.href = 'leveltwo';
        }
    };

    return (
        <div className="popup-overlay" id='popup2'>
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h1>Common Words</h1>
                <div className="image-grid">
                    {[...Array(15)].map((_, index) => (
                        <div 
                            key={index} 
                            className="game-image" 
                            onClick={() => handleGameClick(index)} // Click event handler
                        >
                            <Image 
                                src={gameImage} 
                                alt={`Game ${index + 1}`} 
                                width={70} 
                                height={70} 
                                layout="intrinsic" 
                            />
                            <div className="image-number">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Popup2;
