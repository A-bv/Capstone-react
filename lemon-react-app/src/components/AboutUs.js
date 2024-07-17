// AboutUs.js

import React from 'react';
import '../styles/aboutus.css'; // Import CSS for About Us
import restaurantInterior from '../assets/restaurantInterior.jpg'; // Example image

function AboutUs() {
    return (
        <section id="about-us-section" className="about-us-section">
            <div className="about-us-content">
                <h2>About Us</h2>
                <p>Welcome to Little Lemon, located in the heart of Chicago. Our restaurant offers a delightful array of meals prepared with love and care. Our story began many years ago, and we have been committed to providing our customers with the best dining experience since then.</p>
            </div>
            <div className="about-us-image">
                <img src={restaurantInterior} alt="Restaurant Interior" />
            </div>
        </section>
    );
}

export default AboutUs;