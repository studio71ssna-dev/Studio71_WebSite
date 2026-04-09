import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo flex items-center gap-3 relative z-[1100]">
                <img src="/assets/images/S71_square.png" alt="Studio 71" className="w-10 h-10 object-contain" />
                <span className="logo-text font-black tracking-widest">STUDIO 71</span>
            </div>

            
            <div className="hidden md:flex gap-8 uppercase text-sm tracking-widest">
                <a href="#work" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Products</a>
                <a href="#services" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Services</a>
                <a href="#contact" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Contact</a>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
                className={`hamburger md:hidden ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Menu Backdrop & Links */}
            <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
            <div className={`nav-links ${isOpen ? 'open' : ''} md:hidden`}>
                <a href="#work" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline">Products</a>
                <a href="#services" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline">Services</a>
                <a href="#contact" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline">Contact</a>
            </div>
        </nav>
    );
}