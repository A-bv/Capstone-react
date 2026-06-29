import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';
import ContactModal from './ContactModal';

function Nav({ aboutUsRef }) {
    const [showModal, setShowModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pendingScroll, setPendingScroll] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleContactClick = () => {
        setShowModal(true);
    };

    const scrollToAboutUsWithAnimation = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll once we have actually landed on the home page (after navigation)
    useEffect(() => {
        if (pendingScroll && location.pathname === '/') {
            scrollToAboutUsWithAnimation();
            setPendingScroll(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingScroll, location.pathname]);

    const handleNavigationToAboutUs = () => {
        if (location.pathname === '/') {
            scrollToAboutUsWithAnimation();
        } else {
            setPendingScroll(true);
            navigate('/');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open state
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="nav-logo" />
            {/* Toggle button for mobile view */}
            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="nav-items"
            >
                ☰
            </button>
            {/* Navigation items */}
            <ul id="nav-items" className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
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
