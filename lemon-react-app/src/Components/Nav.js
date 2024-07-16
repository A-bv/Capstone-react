// Components/Nav.js

import React from 'react';
import '../Styles/nav.css'; // Ensure nav.css contains styles for .navbar, .nav-logo, and .nav-items
import logo from '../Assets/Logo.svg';

function Nav() {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            <ul className="nav-items">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
