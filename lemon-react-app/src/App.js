// App.js

import React, { useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';

function App() {
    const aboutUsRef = useRef(null);

    return (
        <div className="App">
            <Nav aboutUsRef={aboutUsRef} />
            <Header />
            <Main />
            <Testimonials />
            <div ref={aboutUsRef}>
                <AboutUs />
            </div>
            <Footer />
        </div>
    );
}

export default App;
