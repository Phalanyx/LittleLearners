import React from 'react';
import Image from 'next/image';
import './topbar.css'; 
import piggyBank from './images/piggybank.png';
import avatar from './images/avatar.png';
import bookImage from "./images/book.png"
import { useState, useEffect } from 'react';

const TopBar = () => {

    const [data, setData] = useState({ name: '', amount: 0 });
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('/api/coinEndpoint', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleLibraryClick = () => {
      if (window.location.pathname === '/') {
        window.location.href = 'book';
      } else {
        window.location.href = '/';
      }
    };
  
    return (
      <div className="topbar">
        <div className="topbar-item">
          <Image src={avatar} width={100} height={100} className="topbar-avatar" />
          <span className="topbar-user">{data.name}</span> 
        </div>

        <div className="topbar-item">
          <button className="book_button" onClick={handleLibraryClick}>
            <Image src={bookImage} width={125} height={125} className="transparent-image" />
          </button>
        </div>

        <div className="topbar-item">
          <Image src={piggyBank} width={100} height={100} className="topbar-piggybank" />
          <span className="topbar-coins">Coins: ${data.amount}</span> 
        </div>
      </div>
    );
};
  
export default TopBar;