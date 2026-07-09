import { Link } from 'react-router-dom';
import '../styles/booking.css';

function ConfirmedBooking() {
    return (
        <div className="booking-page">
            <main className="booking-main">
                <section className="booking-form-section" aria-live="polite">
                    <h2>Booking Confirmed!</h2>
                    <p>Thank you — your reservation at Little Lemon has been confirmed.</p>
                    <p>We look forward to welcoming you.</p>
                    <Link to="/" className="submit-btn">
                        Back to Home
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default ConfirmedBooking;
