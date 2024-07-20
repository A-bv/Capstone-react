// src/App.js

import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import Booking from './components/Booking';
import restaurantFood from './assets/restaurantFood.jpg';
import wallpaper from './assets/wallpaper.jpg';

function App() {
    const aboutUsRef = useRef(null);

    return (
        <BrowserRouter basename="/Capstone-react">
            <div className="App">
                <Nav aboutUsRef={aboutUsRef} />
                <Routes>
                    <Route path="/" element={<HomePageScreen aboutUsRef={aboutUsRef} />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

function HomePageScreen({ aboutUsRef }) {
    return (
        <>
            <Header
                title="Little Lemon"
                subtitle="Chicago"
                description="Welcome to our delightful restaurant located in the heart of Chicago. Enjoy our fresh and delicious meals prepared with love and care."
                imageSrc={restaurantFood}
            />
            <Main />
            <Testimonials />
            <div ref={aboutUsRef}>
                <AboutUs />
            </div>
        </>
    );
}

function BookingPage() {
    return (
        <>
            <Header
                title="Book a Table"
                subtitle="Reserve your table at Little Lemon today!"
                description="Reserve your table at Little Lemon today!"
                imageSrc={wallpaper}
            />
            <Booking />
        </>
    );
}

export default App;
