// pages/Lev1Game1.jsx
import "./Lev1Game1.css"
import LevelOne from "@/app/levelone/LevelOne";
import Sound from "@/app/levelone/a";

import React from 'react';

function Lev1Game1() {
    return (
        <div className="background-container">
            <LevelOne/>
            <Sound/>
        </div>
    );
}

export default Lev1Game1;
