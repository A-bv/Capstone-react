// ContactModal.js

import React from 'react';
import '../styles/contactmodal.css'; // Import CSS for ContactModal

function ContactModal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Contact Details</h2>
                <p>Email: contact@littlelemon.com</p>
                <p>Phone: +1-123-456-7890</p>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ContactModal;
