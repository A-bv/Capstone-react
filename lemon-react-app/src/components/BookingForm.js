// src/components/BookingForm.js

import React, { useState } from 'react';
import '../styles/bookingform.css';

const InputField = ({ label, id, name, type, value, onChange, required, min, max, error }) => (
    <div className="form-group">
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
        {error && <p className="error-message">{error}</p>}
    </div>
);

const SelectField = ({ label, id, name, value, onChange, options, error }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <select id={id} name={name} value={value} onChange={onChange} required>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <p className="error-message">{error}</p>}
    </div>
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

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        date: '',
        guests: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Name validation
        const namePattern = /^[A-Za-z]{2,}$/; // Regular expression to match only letters and at least 2 characters

        if (!namePattern.test(formData.name.trim())) {
            newErrors.name = 'Name is invalid.';
            isValid = false;
        } else {
            newErrors.name = '';
        }

        // Email validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        // Date validation
        if (formData.date === '') {
            newErrors.date = 'Date is required.';
            isValid = false;
        } else {
            newErrors.date = '';
        }

        // Guests validation
        if (formData.guests < 1 || formData.guests > 10) {
            newErrors.guests = 'Number of guests must be between 1 and 10.';
            isValid = false;
        } else {
            newErrors.guests = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission logic (e.g., API call)
            alert('Your reservation has been confirmed!'); // Display confirmation alert

            // Reset form values
            setFormData({
                name: '',
                email: '',
                date: '',
                time: '17:00',
                guests: 1,
                occasion: 'Birthday',
            });

            // Clear errors
            setErrors({
                name: '',
                email: '',
                date: '',
                guests: '',
            });
        }
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
                    error={errors.name}
                />

                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={errors.email}
                />

                <InputField
                    label="Choose date"
                    id="res-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    error={errors.date}
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
                    error={errors.guests}
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
