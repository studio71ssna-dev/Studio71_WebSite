import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TierGrid from './components/TierGrid';
import ClientDetails from './components/ClientDetails';
import { orderTiers } from './data'; // Importing your centralized data

export default function OrderPage() {
    const navigate = useNavigate();
    
    // State is managed at the top level and passed down to children
    const [formData, setFormData] = useState({ 
        clientName: '', 
        email: '', 
        description: '', 
        selectedTier: orderTiers[0] 
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleTierSelect = (tier) => setFormData({ ...formData, selectedTier: tier });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const orderPayload = {
                clientName: formData.clientName,
                email: formData.email,
                description: `[${formData.selectedTier.title}] - ${formData.description}`,
                amount: formData.selectedTier.price
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
            
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-[#FDF7DD] tracking-widest mb-4">INITIATE ORDER</h1>
                    <p className="text-[#a0a0a0]">Select a service tier to generate your custom invoice.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    
                    {/* Modular Component 1: The Grid */}
                    <TierGrid 
                        tiers={orderTiers} 
                        selectedTier={formData.selectedTier} 
                        onSelect={handleTierSelect} 
                    />

                    {/* Modular Component 2: The Form Inputs */}
                    <ClientDetails 
                        formData={formData} 
                        onChange={handleChange} 
                    />

                    <button type="submit" disabled={isGenerating} className="bg-[#00ff9d] text-black py-4 text-lg font-black tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50">
                        {isGenerating ? 'Processing...' : `Generate Invoice (${formData.selectedTier.price.toLocaleString()} BDT)`}
                    </button>
                </form>
            </div>
        </div>
    );
}