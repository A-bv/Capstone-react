// Testimonials.js
import React from 'react';
import '../styles/testimonials.css'; // Import CSS for Testimonials
import customerImage1 from '../assets/customer1.jpg'; // Example customer image
import customerImage2 from '../assets/customer2.jpg'; // Example customer image

const testimonialsData = [
    {
        id: 1,
        name: 'John Doe',
        rating: 5,
        image: customerImage1,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in mi tempus fermentum.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 4,
        image: customerImage2,
        comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    // Add more testimonials as needed
];

function Testimonials() {
    return (
        <section className="testimonials-section">
            <h2>Reviews</h2>
            <div className="testimonials-list">
                {testimonialsData.map(testimonial => (
                    <div key={testimonial.id} className="testimonial">
                        <div className="testimonial-image">
                            <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                        <div className="testimonial-details">
                            <h3>{testimonial.name}</h3>
                            <p>{testimonial.comment}</p>
                            <div className="testimonial-rating">
                                {renderStars(testimonial.rating)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Helper function to render star ratings
function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<span key={i} className="star">&#9733;</span>);
    }
    return stars;
}

export default Testimonials;
