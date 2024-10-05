import React from 'react'

function LevelTwoImages(props) {
    const words = props.words ?? ['apple', 'banana', 'carrot']
    
return (
    <div className="flex flex-row">
        {words.map((word) => {
            return (
                <div key={word}>
                    <img src={'https://freepng.com/uploads/images/202302/ree-vector-red-apple-png_1020x.jpg'} alt={word} className="border-4 border-green-500" />
                </div>
            )
        })}
    </div>
)
}

export default LevelTwoImages