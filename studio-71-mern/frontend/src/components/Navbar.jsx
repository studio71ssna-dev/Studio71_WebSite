export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo flex items-center gap-3">
                <img src="/assets/images/S71_square.png" alt="Studio 71" className="w-10 h-10 object-contain" />
                <span className="logo-text font-black tracking-widest">STUDIO 71</span>
            </div>
            <div className="hidden md:flex gap-8 uppercase text-sm tracking-widest text-[#a0a0a0]">
                <a href="#work" className="hover:text-[#00ff9d] transition-colors">Products</a>
                <a href="#services" className="hover:text-[#00ff9d] transition-colors">Services</a>
                <a href="#contact" className="hover:text-[#00ff9d] transition-colors">Contact</a>
            </div>
        </nav>
    );
}