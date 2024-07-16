// App.js
import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Nav from './Components/Nav';

function App() {
    return (
        <div className="App">
            <Header />
            <Nav />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
