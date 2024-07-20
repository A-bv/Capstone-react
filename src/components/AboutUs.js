// AboutUs.js

import React from 'react';
import '../styles/aboutus.css';
import restaurantInterior from '../assets/teama.jpg';
import secondImage from '../assets/teamb.jpg';

function AboutUs() {
    return (
        <section id="about-us-section" className="about-us-section">
            <div className="about-us-content">
                <h2>About Us</h2>
                <p>Welcome to Little Lemon, located in the heart of Chicago. Our restaurant offers a delightful array of meals prepared with love and care. Our story began many years ago, and we have been committed to providing our customers with the best dining experience since then.</p>
            </div>
            <div className="about-us-images">
                <div className="about-us-image first-image">
                    <img src={restaurantInterior} alt="Interior view of Little Lemon restaurant" />
                </div>
                <div className="about-us-image second-image">
                    <img src={secondImage} alt="Another view of the restaurant" />
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
