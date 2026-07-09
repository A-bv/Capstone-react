import { useRef, type RefObject } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Nav from './components/Nav';
import Testimonials from './components/Testimonials';
import AboutUs from './components/AboutUs';
import Booking from './components/Booking';
import ConfirmedBooking from './components/ConfirmedBooking';
import ErrorBoundary from './components/ErrorBoundary';
import restaurantFood from './assets/restaurantFood.jpg';
import wallpaper from './assets/wallpaper.jpg';

function App() {
    const aboutUsRef = useRef<HTMLDivElement>(null);

    return (
        <HashRouter>
            <div className="App">
                <Nav aboutUsRef={aboutUsRef} />
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<HomePageScreen aboutUsRef={aboutUsRef} />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/confirmed" element={<ConfirmedBooking />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </ErrorBoundary>
                <Footer />
            </div>
        </HashRouter>
    );
}

interface HomePageScreenProps {
    aboutUsRef: RefObject<HTMLDivElement>;
}

function HomePageScreen({ aboutUsRef }: HomePageScreenProps) {
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
