// src/components/Nav.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';
import ContactModal from './ContactModal';

function Nav({ aboutUsRef }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleContactClick = () => {
        setShowModal(true);
    };

    const scrollToAboutUsWithAnimation = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAboutUsWithoutAnimation = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'auto' });
        }
    };

    const handleNavigationToAboutUs = () => {
        if (window.location.pathname === '/') {
            scrollToAboutUsWithAnimation();
        } else {
            navigate('/');
            setTimeout(scrollToAboutUsWithoutAnimation, 0); // Scroll after navigating
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
                <li><Link to="/booking">Booking</Link></li>
                <li><a href="#about" onClick={handleNavigationToAboutUs}>About</a></li>
                <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
            </ul>
            {showModal && <ContactModal onClose={closeModal} />}
        </nav>
    );
}

export default Nav;

