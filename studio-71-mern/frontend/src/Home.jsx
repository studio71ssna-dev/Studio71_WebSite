import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Hero />
            <Products />
            <Services />
            <ContactForm />
            <Footer />
        </div>
    );
}