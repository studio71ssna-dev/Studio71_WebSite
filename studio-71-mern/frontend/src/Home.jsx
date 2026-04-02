import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import ContactForm from './components/ContactForm';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Products />
            <Services />
            <ContactForm />
        </div>
    );
}