import React from 'react'
import './leveltwoImages.css'
function LevelTwoImages(props) {
    const links = props.links ?? ['https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg', 'https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg', 'https://img.freepik.com/premium-photo/white-wall-with-white-background-that-says-word-it_994023-371201.jpg']
    
return (
    <div id="imageLst">
        {links.map((link) => {
            return (
                <div>
                    <img  src={link} />
                </div>
            )
        })}
    </div>
)
}

export default LevelTwoImages