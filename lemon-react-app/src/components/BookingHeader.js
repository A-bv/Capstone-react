// src/components/BookingHeader.js

import React from 'react';
import restaurantFood from '../assets/restaurantFood.jpg';
import '../styles/header.css';

function BookingHeader() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-text">
                    <h1>Book a Table</h1>
                    <p>Reserve your table at Little Lemon today!</p>
                </div>
            </div>
            <div className="header-right">
                <div className="header-image">
                    <img src={restaurantFood} alt="Banner" className="header-img" />
                </div>
            </div>
        </header>
    );
}

export default BookingHeader;
