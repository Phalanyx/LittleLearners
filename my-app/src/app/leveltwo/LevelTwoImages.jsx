import React from 'react'
import './leveltwoImages.css'
function LevelTwoImages(props) {
    const words = props.words ?? ['apple', 'banana', 'carrot']
    
return (
    <div id="imageLst">
        {words.map((word) => {
            return (
                <div key={word}>
                    <img src={'https://freepng.com/uploads/images/202302/ree-vector-red-apple-png_1020x.jpg'} alt={word} />
                </div>
            )
        })}
    </div>
)
}

export default LevelTwoImages