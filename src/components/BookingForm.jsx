// src/components/BookingForm.js

import React, { useState, useEffect } from 'react';
import '../styles/bookingform.css';

// Local calendar date as YYYY-MM-DD, used to block reservations in the past.
// Built from local date parts (not toISOString) so it is not shifted by the
// timezone offset near midnight.
const todayISO = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

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

const SelectField = ({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    options,
    error,
    emptyLabel = 'No options available',
}) => {
    const noOptions = options.length === 0;
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}:</label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                disabled={noOptions}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id}-error` : undefined}
            >
                {noOptions ? (
                    <option value="">{emptyLabel}</option>
                ) : (
                    options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                )}
            </select>
            {error && (
                <p id={`${id}-error`} className="error-message" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

const BookingForm = ({ availableTimes = [], dispatch, submitForm }) => {
    const minDate = todayISO();

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
        time: '',
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
                if (value === '') return 'Date is required.';
                if (value < minDate) return 'Date cannot be in the past.';
                return '';
            case 'time':
                return value ? '' : 'Please choose a time.';
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
            time: validateField('time', formData.time),
            guests: validateField('guests', formData.guests),
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, date: true, time: true, guests: true });
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
                    required
                    min={minDate}
                    error={errors.date}
                />

                <SelectField
                    label="Choose time"
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={availableTimes}
                    error={errors.time}
                    emptyLabel="No times available — choose another date"
                />

                <InputField
                    label="Number of guests"
                    id="guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
