// ContactModal.js

import React, { useEffect, useRef } from 'react';
import '../styles/contactmodal.css';

function ContactModal({ onClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        // Move focus into the dialog when it opens
        modalRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (e) => {
        // Close only when the click is on the overlay itself, not its content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                ref={modalRef}
                tabIndex={-1}
            >
                <h2 id="contact-modal-title">Contact Details</h2>
                <p>Email: contact@littlelemon.com</p>
                <p>Phone: +1-123-456-7890</p>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ContactModal;
