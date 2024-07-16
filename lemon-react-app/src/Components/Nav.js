// Nav.js
import React from 'react';
import '../styles/nav.css';
import logo from '../assets/Logo.svg'; // Adjust the path as per your file structure

function Nav() {
    const scrollToAboutUs = () => {
        const aboutUsSection = document.getElementById('about-us-section');
        if (aboutUsSection) {
            aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            <ul className="nav-items">
                <li><a href="#home">Home</a></li>
                <li><a href="#about" onClick={scrollToAboutUs}>About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
