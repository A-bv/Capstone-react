// src/components/Header.js

import React from 'react';
import '../styles/header.css';

function Header({ title, subtitle, description, imageSrc }) {
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-text">
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="header-right">
                <div className="header-image">
                    <img src={imageSrc} alt="Banner" className="header-img" />
                </div>
            </div>
        </header>
    );
}

export default Header;
