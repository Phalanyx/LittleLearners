import React from 'react';
import Image from 'next/image';
import './topbar.css'; 
import piggyBank from './images/piggybank.png';
import avatar from './images/avatar.png';
import bookImage from "./images/book.png"

const TopBar = () => {

    const handlelibraryClick = () =>{
        window.location.href = 'book'
    }    

    return (
        <div className="topbar">
            <div className="topbar-left">
                <Image src={avatar} width={100} height={100} className="topbar-avatar" />
                <span className="topbar-user">UserName</span>
            </div>
            <button className='book_button' onClick={() => handlelibraryClick()}>
                <Image src={bookImage} width={125} height={125} className="transparent-image" />
            </button>
            <div className="topbar-right">
                <span className="topbar-coins">Coins: $100</span>
                <Image src={piggyBank} width={100} height={100} className="topbar-piggybank" />
            </div>
        </div>
    );
};

export default TopBar;