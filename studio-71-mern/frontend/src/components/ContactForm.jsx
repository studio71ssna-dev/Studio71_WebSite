import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ clientName: '', email: '', description: '' });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const res = await fetch('https://studio71-backend.onrender.com/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const responseData = await res.json();
            
            if (res.ok && responseData.success) {
                navigate(`/invoice/${responseData.data._id}`); 
            } else {
                alert("Submission failed: " + responseData.message);
                setIsSending(false);
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Failed to connect to backend server.");
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="container mx-auto px-6 py-24 max-w-2xl border-t border-[#222]">
            <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-8">Contact Us</h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Name</label>
                    <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Your Name" className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Project Details</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Tell us about your project..." className="bg-[#111] border border-[#222] text-[#FDF7DD] p-4 focus:border-[#006D44] outline-none transition-colors resize-y" required></textarea>
                </div>
                <button type="submit" disabled={isSending} className="mt-4 bg-transparent border border-[#006D44] text-[#FDF7DD] py-4 uppercase text-sm font-bold tracking-widest hover:bg-[#006D44] hover:shadow-[0_0_15px_rgba(0,109,68,0.6)] transition-all disabled:opacity-50 cursor-pointer">
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </section>
    );
}