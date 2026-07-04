// src/components/Booking.js

import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from '../api';
import '../styles/booking.css';

// Available times for today, used as the reducer's initial state.
export const initializeTimes = () => fetchAPI(new Date());

// Recompute available times whenever the selected date changes.
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(new Date(action.date));
        default:
            return state;
    }
};

function Booking() {
    const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
    const navigate = useNavigate();

    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate('/confirmed');
            return true;
        }
        return false;
    };

    return (
        <div className="booking-page">
            <main className="booking-main">
                <BookingForm
                    availableTimes={availableTimes}
                    dispatch={dispatch}
                    submitForm={submitForm}
                />
            </main>
        </div>
    );
}

export default Booking;
