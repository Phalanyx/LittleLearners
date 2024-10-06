import React from 'react';
import Image from 'next/image';
import './topbar.css'; 
import piggyBank from './images/piggybank.png';
import avatar from './images/avatar.png';

const TopBar = () => {

    return (
        <div className="topbar">
            <div className="topbar-left">
                <Image src={avatar} width={100} height={100} className="topbar-avatar" />
                <span className="topbar-user">UserName</span>
            </div>
            <div className="topbar-right">
                <span className="topbar-coins">Coins: $100</span>
                <Image src={piggyBank} width={100} height={100} className="topbar-piggybank" />
            </div>
        </div>
    );
};

export default TopBar;