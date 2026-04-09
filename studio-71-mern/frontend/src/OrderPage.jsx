import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path if needed

// Define your pricing tiers here
const TIERS = [
    { id: 'prototype', title: '2D Prototype', price: 5000, desc: 'Basic 2D game mechanics prototype.' },
    { id: 'vr_module', title: 'VR Module', price: 15000, desc: 'Interactive VR training or experience module.' },
    { id: 'full_3d', title: 'Full 3D Production', price: 30000, desc: 'Complete 3D game lifecycle production.' }
];

export default function OrderPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ clientName: '', email: '', description: '', selectedTier: TIERS[0] });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleTierSelect = (tier) => setFormData({ ...formData, selectedTier: tier });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            // We now send the explicit price and formatted description to the backend
            const orderPayload = {
                clientName: formData.clientName,
                email: formData.email,
                description: `[${formData.selectedTier.title}] - ${formData.description}`,
                amount: formData.selectedTier.price // <-- Sending the exact price
            };

            const res = await fetch('https://studio71-backend.onrender.com/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });
            const responseData = await res.json();
            
            if (res.ok && responseData.success) {
                navigate(`/invoice/${responseData.data._id}`); 
            } else {
                alert("Order failed: " + responseData.message);
                setIsGenerating(false);
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Failed to connect to backend server.");
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <Navbar />
            
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-[#FDF7DD] tracking-widest mb-4">INITIATE ORDER</h1>
                    <p className="text-[#a0a0a0]">Select a service tier to generate your custom invoice.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    
                    {/* Tier Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TIERS.map(tier => (
                            <div 
                                key={tier.id}
                                onClick={() => handleTierSelect(tier)}
                                className={`p-6 border cursor-pointer transition-all ${formData.selectedTier.id === tier.id ? 'bg-[#006D44] border-[#00ff9d] scale-105 shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'bg-[#111] border-[#222] hover:border-[#006D44]'}`}
                            >
                                <h3 className={`font-bold mb-2 ${formData.selectedTier.id === tier.id ? 'text-[#FDF7DD]' : 'text-[#00ff9d]'}`}>{tier.title}</h3>
                                <p className={`text-2xl font-mono mb-4 ${formData.selectedTier.id === tier.id ? 'text-white' : 'text-[#FDF7DD]'}`}>{tier.price.toLocaleString()} BDT</p>
                                <p className={`text-sm ${formData.selectedTier.id === tier.id ? 'text-[#e0e0e0]' : 'text-[#a0a0a0]'}`}>{tier.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Client Details */}
                    <div className="bg-[#111] border border-[#222] p-8 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Name / Organization</label>
                                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Specific Requirements</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors resize-none" required></textarea>
                        </div>
                    </div>

                    <button type="submit" disabled={isGenerating} className="bg-[#00ff9d] text-black py-4 text-lg font-black tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50">
                        {isGenerating ? 'Processing...' : `Generate Invoice (${formData.selectedTier.price.toLocaleString()} BDT)`}
                    </button>
                </form>
            </div>
        </div>
    );
}