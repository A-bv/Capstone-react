import React from 'react';
import '../Styles/header.css';
import restaurantFood from '../Assets/restaurantFood.jpg';

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-text">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>Welcome to our delightful restaurant located in the heart of Chicago. Enjoy our fresh and delicious meals prepared with love and care.</p>
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

export default Header;

