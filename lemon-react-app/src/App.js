// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';

function App() {
    return (
        <div className="App">
            <Nav />
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
