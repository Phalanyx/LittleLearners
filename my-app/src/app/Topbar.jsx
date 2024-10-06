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

    const handleLibraryClick = () =>{
        window.location.href = 'book'
    }
  
    return (
      <div className="topbar">
        <div className="topbar-left">
          <Image src={avatar} width={100} height={100} className="topbar-avatar" />
          <span className="topbar-user">{data.name}</span> 
        </div>
  
        <button className="book_button" onClick={handleLibraryClick}>
          <Image src={bookImage} width={125} height={125} className="transparent-image" />
        </button>
  
        <div className="topbar-right">
          <span className="topbar-coins">Coins: ${data.amount}</span> 
          <Image src={piggyBank} width={100} height={100} className="topbar-piggybank" />
        </div>
      </div>
    );

};
  
export default TopBar;