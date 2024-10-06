import React from 'react';
import './LevelTwoImages.css';

function LevelTwoImages(props) {
    const links = props.links ?? ['https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg', 'https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg', 'https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg']
    
return (
    <div id="imageLst">
        {links.map((link) => {
            return (
                <div className='image-container'>
                    <img  src={link} className='image-item' />
                </div>
            )
        })}
    </div>
)
}

export default LevelTwoImages;
