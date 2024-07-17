// Nav.js

import React, { useState } from 'react';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';
import ContactModal from './ContactModal'; // Import ContactModal component

function Nav() {
    const [showModal, setShowModal] = useState(false);

    const handleContactClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            <ul className="nav-items">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
            </ul>
            {showModal && <ContactModal onClose={closeModal} />}
        </nav>
    );
}

export default Nav;
