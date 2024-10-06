"use client";

import { useState } from 'react';
import './book.css';
import story_plots_data from './story_plots.json';
import themes_data from './themes.json';
import Image from 'next/image';
import next_icon from './next_icon.png';
import previous_icon from './previous_icon.png';
import TopBar from '../Topbar';
import '../Topbar.css'

export default function Home() {

  const [book_content, setBookContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [current_page, setCurrentPage] = useState(1);
  const [preferences, setPreferences] = useState({
    main_character: '',
    theme: '',
    story: '',
    creativity: 0,
  });

  async function subtract() {
    const response = await fetch('/api/subtractCoin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1 }),
    });
  }

  // Fetch the book content
  const fetchBook = async () => {

    try {
      const response = await fetch('/api/generateBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });

      const data = await response.json();
      setBookContent(data.book);
      setCurrentPage(1); 
    } 
    catch (error) {
      console.error('Error generating book:', error);
    } 
    finally {
      setLoading(false); 
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/coinEndpoint', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.amount < 5) {
        alert("You don't have enough coins to generate a book");
        return;
      }
      else {
        setLoading(true); 
        subtract();
        fetchBook();
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle the fetch book button click
  const handleFetchBook = () => {
    fetchData();
  }

  // Render the book content
  const renderBook = () => {

    if (!book_content) {
      return null;
    }

    const total_pages = Object.keys(book_content).length / 2;

    const handleNextPage = () => {
      if (current_page < total_pages) {
        setCurrentPage(current_page + 1);
      }
    };

    const handlePreviousPage = () => {
      if (current_page > 1) {
        setCurrentPage(current_page - 1);
      }
    };

    const handleCloseBook = () => {
      setBookContent(null); 
    }

    const pageContentKey = `Content ${current_page}`;
    const pageImageKey = `Image ${current_page}`;
    
    return (
      <div className="book">

        <div className="book-controls">
          <button className="control-button" onClick={handlePreviousPage} disabled={current_page === 1}>
            <Image src={previous_icon} width={25} height={25} />
          </button>
          <button className="control-button" onClick={handleNextPage} disabled={current_page >= total_pages}>
            <Image src={next_icon} width={25} height={25} />
          </button>
          <button className="other-button" onClick={handleCloseBook}>
            Close Book
          </button>
          <button className="other-button">
            Save Book
          </button>
        </div>  
      
        <div className="book-page">
          <div className="page-content">
            <h2>Page {current_page}</h2>
            <p>{book_content[pageContentKey]}</p>
          </div>
          {book_content[pageImageKey] && (
            <div className="page-image">
              <img src={book_content[pageImageKey]} width={512} height={512} />
            </div>
          )}
        </div>
        
      </div>
    );
  };

  // Handle the input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  // Render the form
  const renderForm = () => {

    const isValid = preferences.main_character && preferences.theme && preferences.story && preferences.creativity;

    return (
      <form>
        <div>
          <label>Main Character:</label>
          <input
            type="text"
            name="main_character"
            value={preferences.main_character}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Theme:</label>
          <select name="theme" value={preferences.theme} onChange={handleInputChange}>
            {themes_data.themes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Story:</label>
          <select name="story" value={preferences.story} onChange={handleInputChange}>
            {story_plots_data.story_plots.map((story, index) => (
              <option key={index} value={story}>
                {story}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Creativity (0 to 1):</label>
          <input
            type="number"
            name="creativity"
            value={preferences.creativity}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="1"
          />
        </div>

        <button type="button" onClick={handleFetchBook} disabled={!isValid}>Generate Book</button>
      </form>
    );
  };

  // Main HTML content
  return (
    <div>
      <TopBar />
      {!book_content && (
        <div>
          {renderForm()}
          {loading && (
            <div className="spinner"></div>
          )}
        </div>
      )}
      
      {!loading && book_content && (
        <div>
          {renderBook()}
        </div>
      )}
    </div>
  );

}