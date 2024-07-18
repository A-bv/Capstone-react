// src/components/Booking.js

import React from 'react';
import BookingForm from './BookingForm';
import '../styles/booking.css'; // Ensure the CSS file is imported for styling

function Booking() {
    return (
        <div className="booking-page">
            <main className="booking-main">
                <BookingForm />
            </main>
        </div>
    );
}

export default Booking;
