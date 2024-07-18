// src/components/BookingForm.js

import React, { useState } from 'react';
import '../styles/bookingform.css'; // Adjust the path as necessary

function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '17:00', // Default time
        guests: 1,
        occasion: 'Birthday', // Default occasion
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Handle form submission logic (e.g., API call)
    };

    return (
        <section className="booking-form-section">
            <h2>Reservation Form</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="res-date">Choose date:</label>
                <input
                    type="date"
                    id="res-date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="res-time">Choose time:</label>
                <select
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                >
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                </select>

                <label htmlFor="guests">Number of guests:</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                />

                <label htmlFor="occasion">Occasion:</label>
                <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>

                <input type="submit" value="Make Your Reservation" className="submit-btn" />
            </form>
        </section>
    );
}

export default BookingForm;
