import React from 'react';
import '../Styles/main.css'; // Import CSS for Main
import brochetteImage from '../Assets/brochette.jpg';
import pitaImage from '../Assets/pita.jpg';
import greekImage from '../Assets/greek.jpg';
import humusImage from '../Assets/humus.jpg';
import dessertImage from '../Assets/dessert.jpg';

function Main() {
    return (
        <main className="main-content">
            <h2>Welcome to the Homepage</h2>
            <p>This is the main content of the homepage.</p>

            <section className="article-section">
                <article className="article">
                    <img src={pitaImage} alt="Article 1" className="article-image" />
                    <h3>Article 1</h3>
                    <p>Description of Article 1</p>
                </article>
                <article className="article">
                    <img src={greekImage} alt="Article 2" className="article-image" />
                    <h3>Article 2</h3>
                    <p>Description of Article 2</p>
                </article>
                <article className="article">
                    <img src={humusImage} alt="Article 3" className="article-image" />
                    <h3>Article 3</h3>
                    <p>Description of Article 3</p>
                </article>
                <article className="article">
                    <img src={dessertImage} alt="Article 4" className="article-image" />
                    <h3>Article 4</h3>
                    <p>Description of Article 4</p>
                </article>
                <article className="article">
                    <img src={brochetteImage} alt="Article 5" className="article-image" />
                    <h3>Article 5</h3>
                    <p>Description of Article 5</p>
                </article>
            </section>
        </main>
    );
}

export default Main;
