import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inHouseProducts, services } from './data';

export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ clientName: '', email: '', description: '' });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const res = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const responseData = await res.json();
            
            if (res.ok && responseData.success) {
                navigate(`/invoice/${responseData.data._id}`); 
            } else {
                alert("Transmission failed: " + responseData.message);
                setIsSending(false);
            }
        } catch (error) {
            console.error("Comm-Link Error:", error);
            alert("Failed to connect to backend server.");
            setIsSending(false);
        }
    };

    return (
        <div>
            {/* Navbar */}
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

            {/* Hero */}
            <header className="hero flex flex-col justify-center items-center h-screen text-center px-6">
                <div className="hero-content">
                    <img src="/assets/images/S71_square.png" alt="Studio 71" className="w-64 mx-auto mb-8 fade-in" />
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-[0.2em] text-[#FDF7DD]">STUDIO-71</h1>
                    <p className="subtitle text-[#a0a0a0] max-w-3xl mx-auto text-lg leading-relaxed text-justify" style={{ textAlignLast: 'center' }}>
                        Studio 71 is an independent development house dedicated to games with a pulse.
                        We bridge the gap between technical innovation and human connection, crafting experiences that explore empathy, vulnerability, and the impact of our actions.
                    </p>
                </div>
            </header>

            {/* Products Grid */}
            <section id="work" className="container mx-auto px-6 py-16 max-w-6xl">
                <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-10">In-House Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {inHouseProducts.map(p => (
                        <div key={p.id} className="project-card bg-[#111] border border-[#222] hover:border-[#006D44] hover:-translate-y-1 transition-all flex flex-col">
                            <div className="h-56 bg-cover bg-center border-b border-[#222]" style={{ backgroundImage: `url('${p.image}')` }}></div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#FDF7DD] mb-1">{p.title}</h3>
                                <p className="text-xs font-bold text-[#00ff9d] mb-4 uppercase tracking-wider">{p.subtitle}</p>
                                <p className="text-[#a0a0a0] text-sm flex-grow mb-6 leading-relaxed">{p.description}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {p.tags.map(tag => <span key={tag} className="text-[0.65rem] uppercase tracking-wider bg-[#1a1a1a] text-[#888] border border-[#333] px-3 py-1">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="container mx-auto px-6 py-16 max-w-6xl border-t border-[#222]">
                <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-10">Operational Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((s, index) => (
                        <div key={index} className="bg-[#111] border border-[#222] p-8 hover:bg-[#1a1a1a] transition-colors">
                            <h3 className="text-lg font-bold text-[#00ff9d] mb-3">{s.title}</h3>
                            <p className="text-[#a0a0a0] text-sm mb-4">{s.desc}</p>
                            <div className="text-[0.65rem] uppercase tracking-widest text-[#006D44] font-bold">Status: Operational</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="container mx-auto px-6 py-24 max-w-2xl border-t border-[#222]">
                <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-8">Establish Connection</h2>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">ID / Alias</label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Designation" className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Comm-Link</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@domain.com" className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Transmission</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Enter data..." className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors resize-y" required></textarea>
                    </div>
                    <button type="submit" disabled={isSending} className="mt-4 bg-transparent border border-[#006D44] text-[#FDF7DD] py-4 uppercase text-sm font-bold tracking-widest hover:bg-[#006D44] hover:shadow-[0_0_15px_rgba(0,109,68,0.6)] transition-all disabled:opacity-50 cursor-pointer">
                        {isSending ? 'Transmitting...' : 'Send Transmission'}
                    </button>
                </form>
            </section>
        </div>
    );
}