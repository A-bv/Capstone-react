import React from 'react';
import '../styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Little Lemon</p>
        </footer>
    );
}

export default Footer;
