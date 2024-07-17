// src/App.js

import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        /*<Router>*/
            <div className="App">
                <Nav aboutUsRef={aboutUsRef} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <Main />
                            <Testimonials />
                            <div ref={aboutUsRef}>
                                <AboutUs />
                            </div>
                            <Footer />
                        </>
                    } />
                    <Route path="/booking" element={<Booking />} />
                </Routes>
            </div>
        /*</Router>*/
    );
}

export default App;
