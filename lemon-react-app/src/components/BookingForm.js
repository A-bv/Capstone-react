// src/components/BookingForm.js

import React from 'react';
import '../styles/booking.css'; // Ensure the CSS file is imported for styling

function BookingForm() {
    return (
        <section className="booking-form-section">
            <h2>Reservation Form</h2>
            <form className="booking-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" id="time" name="time" required />
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Number of Guests:</label>
                    <input type="number" id="guests" name="guests" required />
                </div>
                <button type="submit" className="submit-btn">Reserve</button>
            </form>
        </section>
    );
}

export default BookingForm;

