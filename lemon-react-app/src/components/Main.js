import React from 'react';
import '../styles/main.css';
import brochetteImage from '../assets/brochette.jpg';
import pitaImage from '../assets/pita.jpg';
import greekImage from '../assets/greek.jpg';
import humusImage from '../assets/humus.jpg';
import dessertImage from '../assets/dessert.jpg';

function Main() {
    return (
        <main className="main-content">
            <h2>Our daily specials</h2>
            <p>Explore our delicious offerings from around the world.</p>

            <section className="article-section">
                <article className="article">
                    <img src={pitaImage} alt="Pita Bread" className="article-image" />
                    <h3>Pita Bread</h3>
                    <p>Traditional soft and chewy pita bread, perfect for wraps and dips.</p>
                </article>
                <article className="article">
                    <img src={greekImage} alt="Greek Salad" className="article-image" />
                    <h3>Greek Salad</h3>
                    <p>Fresh and colorful Greek salad with olives, feta cheese, and a zesty dressing.</p>
                </article>
                <article className="article">
                    <img src={humusImage} alt="Hummus" className="article-image" />
                    <h3>Hummus</h3>
                    <p>Smooth and creamy chickpea dip, seasoned with garlic, lemon, and tahini.</p>
                </article>
                <article className="article">
                    <img src={dessertImage} alt="Dessert" className="article-image" />
                    <h3>Desserts</h3>
                    <p>Sweet and decadent dessert, perfect for satisfying your sweet tooth.</p>
                </article>
                <article className="article">
                    <img src={brochetteImage} alt="Skewers" className="article-image" />
                    <h3>Skewers</h3>
                    <p>Grilled skewers of marinated meat and vegetables, a flavorful dish for any occasion.</p>
                </article>
            </section>
        </main>
    );
}

export default Main;
