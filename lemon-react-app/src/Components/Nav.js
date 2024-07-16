// Nav.js
import React from 'react';
import '../Styles/nav.css'; // Import CSS for Nav

function Nav() {
    return (
        <nav className="nav">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
