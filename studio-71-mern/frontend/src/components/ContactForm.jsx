import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({ clientName: '', email: '', description: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    // 👉 PASTE YOUR WEB3FORMS ACCESS KEY HERE:
                    access_key: "8e62f738-932e-4e50-9cb0-89c66d545545",
                    
                    // The data from your form:
                    name: formData.clientName,
                    email: formData.email,
                    message: formData.description,
                    
                    // Optional: Custom subject line for your inbox
                    subject: "New Inquiry from Studio 71 Website",
                    from_name: "Studio 71 Portal"
                })
            });
            
            const responseData = await res.json();
            
            if (res.ok && responseData.success) {
                setStatus('success');
                setFormData({ clientName: '', email: '', description: '' }); // Clear form
                setTimeout(() => setStatus('idle'), 5000); // Reset UI after 5 seconds
            } else {
                alert("Failed to send message: " + responseData.message);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error("Transmission Error:", error);
            alert("Failed to connect to the mail server.");
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="contact" className="container mx-auto px-6 py-24 max-w-2xl border-t border-[#222]">
            <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-8">Contact Us</h2>
            
            {status === 'success' ? (
                <div className="bg-[#006D44] text-[#FDF7DD] p-6 text-center font-bold tracking-widest uppercase border border-[#00ff9d]">
                    Message Sent. We will respond to your comm-link shortly.
                </div>
            ) : (
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
                    
                    {/* Bot prevention (Honeypot) - Hidden from real users, stops spam bots */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                    <button type="submit" disabled={status === 'sending'} className="mt-4 bg-transparent border border-[#006D44] text-[#FDF7DD] py-4 uppercase text-sm font-bold tracking-widest hover:bg-[#006D44] hover:shadow-[0_0_15px_rgba(0,109,68,0.6)] transition-all disabled:opacity-50 cursor-pointer">
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </section>
    );
}