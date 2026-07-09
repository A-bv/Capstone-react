import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './bookingReducer';
import { submitAPI, type BookingFormData } from '../api';
import '../styles/booking.css';

function Booking() {
    const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
    const navigate = useNavigate();

    const submitForm = (formData: BookingFormData): boolean => {
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
