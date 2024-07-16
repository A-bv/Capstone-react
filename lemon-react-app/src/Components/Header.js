// Header.js
import React from 'react';
import '../Styles/header.css'; // Import CSS for Header
import logo from '../Assets/Logo.svg'; // Corrected import path for Logo asset

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" />
            <h1>Welcome to My Website</h1>
        </header>
    );
}

export default Header;