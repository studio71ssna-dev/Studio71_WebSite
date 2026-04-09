import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar bg-[#0a0a0a] border-b border-[#222]">
            <div className="logo flex items-center gap-3 relative z-[1100]">
                <a href="/" className="flex items-center gap-3 no-underline">
                    <img src="/assets/images/S71_square.png" alt="Studio 71" className="w-10 h-10 object-contain" />
                    <span className="logo-text font-black tracking-widest text-white">STUDIO 71</span>
                </a>
            </div>

            {/* Desktop Links - Order button placed leftmost */}
            <div className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest">
                <a href="/order" className="bg-[#006D44] text-[#FDF7DD] px-5 py-2 font-bold no-underline hover:bg-[#00ff9d] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all">Order Now</a>
                <a href="/#work" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Products</a>
                <a href="/#services" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Services</a>
                <a href="/#contact" className="text-[#00ff9d] font-bold no-underline hover:text-white transition-colors">Contact</a>
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
            <div className={`nav-links ${isOpen ? 'open' : ''} md:hidden flex flex-col gap-6 pt-20`}>
                <a href="/order" onClick={() => setIsOpen(false)} className="bg-[#006D44] text-center text-[#FDF7DD] px-5 py-3 font-bold no-underline w-full max-w-[200px]">ORDER NOW</a>
                <a href="/#work" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline text-xl">Products</a>
                <a href="/#services" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline text-xl">Services</a>
                <a href="/#contact" onClick={() => setIsOpen(false)} className="text-[#00ff9d] font-bold no-underline text-xl">Contact</a>
            </div>
        </nav>
    );
}