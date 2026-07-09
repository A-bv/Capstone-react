import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../assets/Logo.svg';
import ContactModal from './ContactModal';

interface NavProps {
    aboutUsRef: RefObject<HTMLDivElement>;
}

function Nav({ aboutUsRef }: NavProps) {
    const [showModal, setShowModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // A plain flag, not state: flipping it should not trigger a re-render.
    const pendingScroll = useRef(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleContactClick = () => {
        setShowModal(true);
    };

    const scrollToAboutUs = useCallback(() => {
        aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aboutUsRef]);

    // Scroll once we have actually landed on the home page (after navigation).
    useEffect(() => {
        if (pendingScroll.current && location.pathname === '/') {
            scrollToAboutUs();
            pendingScroll.current = false;
        }
    }, [location.pathname, scrollToAboutUs]);

    const handleNavigationToAboutUs = () => {
        if (location.pathname === '/') {
            scrollToAboutUs();
        } else {
            pendingScroll.current = true;
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
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
                <li>
                    <button type="button" onClick={handleNavigationToAboutUs}>
                        About
                    </button>
                </li>
                <li>
                    <button type="button" onClick={handleContactClick}>
                        Contact
                    </button>
                </li>
            </ul>
            {showModal && <ContactModal onClose={closeModal} />}
        </nav>
    );
}

export default Nav;
