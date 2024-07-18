// src/components/BookingForm.js

import React, { useState } from 'react';
import '../styles/bookingform.css'; // Adjust the path as necessary

const InputField = ({ label, id, name, type, value, onChange, required, min, max }) => (
    <>
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            max={max}
        />
    </>
);

const SelectField = ({ label, id, name, value, onChange, options }) => (
    <>
        <label htmlFor={id}>{label}:</label>
        <select id={id} name={name} value={value} onChange={onChange} required>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </>
);

const BookingForm = () => {
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
                <InputField
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Choose date"
                    id="res-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <SelectField
                    label="Choose time"
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    options={['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']}
                />

                <InputField
                    label="Number of guests"
                    id="guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                />

                <SelectField
                    label="Occasion"
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    options={['Birthday', 'Anniversary']}
                />

                <input type="submit" value="Make Your Reservation" className="submit-btn" />
            </form>
        </section>
    );
};

export default BookingForm;
