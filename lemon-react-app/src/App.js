// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';

function App() {
    return (
        <div className="App">
            <Nav />
            <Header />
            <Main />
            <Testimonials />
            <AboutUs />
            <Footer />
        </div>
    );
}

export default App;
