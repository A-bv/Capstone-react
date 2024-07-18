// src/App.js

import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import Booking from './components/Booking';

function App() {
    const aboutUsRef = useRef(null);

    return (
        <div className="App">
            <Nav aboutUsRef={aboutUsRef} />
            <Routes>
                <Route path="/" element={<HomePage aboutUsRef={aboutUsRef} />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
            <Footer />
        </div>
    );
}

// Home page component for nested routing
function HomePage({ aboutUsRef }) {
    return (
        <>
            <Header />
            <Main />
            <Testimonials />
            <div ref={aboutUsRef}>
                <AboutUs />
            </div>
        </>
    );
}

export default App;
