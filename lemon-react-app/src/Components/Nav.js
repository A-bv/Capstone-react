// Nav.js

import React from 'react';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';

function Nav() {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            <ul className="nav-items">
                <li><a href="#home">Home</a></li>
                <li><a href="#about" onClick={scrollToAbout}>About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Nav;

function scrollToAbout(event) {
    event.preventDefault();
    const aboutUsSection = document.getElementById('about-us-section');
    if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
