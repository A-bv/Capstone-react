// src/components/Nav.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';
import ContactModal from './ContactModal';

function Nav({ aboutUsRef }) {
    const [showModal, setShowModal] = useState(false);

    const handleContactClick = () => {
        setShowModal(true);
    };

    const handleScrollToAboutUs = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            <ul className="nav-items">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about" onClick={handleScrollToAboutUs}>About</a></li>
                <li><Link to="/booking">Booking</Link></li>
                <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
            </ul>
            {showModal && <ContactModal onClose={closeModal} />}
        </nav>
    );
}

export default Nav;
