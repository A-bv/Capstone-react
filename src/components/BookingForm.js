// src/components/BookingForm.js

import React, { useState, useEffect } from 'react';
import '../styles/bookingform.css';

const InputField = ({
    label,
    id,
    name,
    type,
    value,
    onChange,
    onBlur,
    required,
    min,
    max,
    error,
}) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            min={min}
            max={max}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
            <p id={`${id}-error`} className="error-message" role="alert">
                {error}
            </p>
        )}
    </div>
);

const SelectField = ({ label, id, name, value, onChange, options, error }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && (
            <p id={`${id}-error`} className="error-message" role="alert">
                {error}
            </p>
        )}
    </div>
);

const BookingForm = ({ availableTimes = [], dispatch, submitForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: availableTimes[0] || '', // First available slot
        guests: 1,
        occasion: 'Birthday', // Default occasion
    });

    // Keep the selected time valid whenever the available slots change
    useEffect(() => {
        if (availableTimes.length && !availableTimes.includes(formData.time)) {
            setFormData((prev) => ({ ...prev, time: availableTimes[0] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableTimes]);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        date: '',
        guests: '',
    });

    const [touched, setTouched] = useState({});

    // Validate a single field and return its error message ('' when valid)
    const validateField = (name, value) => {
        switch (name) {
            case 'name': {
                const namePattern = /^[A-Za-z]{2,}$/; // only letters, at least 2 characters
                return namePattern.test(String(value).trim()) ? '' : 'Name is invalid.';
            }
            case 'email':
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid.';
            case 'date':
                return value === '' ? 'Date is required.' : '';
            case 'guests':
                return value < 1 || value > 10 ? 'Number of guests must be between 1 and 10.' : '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            date: validateField('date', formData.date),
            guests: validateField('guests', formData.guests),
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, date: true, guests: true });
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'guests' ? Number(value) : value;

        // Refresh available times when the date changes
        if (name === 'date' && dispatch) {
            dispatch({ type: 'UPDATE_TIMES', date: value });
        }

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Re-validate on change only once the field has been touched
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm() && submitForm) {
            submitForm(formData);
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
                    onBlur={handleBlur} // Add this line
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
                    onBlur={handleBlur} // Add this line
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
                    onBlur={handleBlur} // Add this line
                    required
                    error={errors.date}
                />

                <SelectField
                    label="Choose time"
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    options={availableTimes}
                />

                <InputField
                    label="Number of guests"
                    id="guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    onBlur={handleBlur} // Add this line
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
