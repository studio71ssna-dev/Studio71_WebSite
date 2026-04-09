export default function ClientDetails({ formData, onChange }) {
    return (
        <div className="bg-[#111] border border-[#222] p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Name / Organization</label>
                    <input type="text" name="clientName" value={formData.clientName} onChange={onChange} className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors" required />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-[#a0a0a0]">Specific Requirements</label>
                <textarea name="description" value={formData.description} onChange={onChange} rows="3" className="bg-transparent border-b border-[#333] text-[#FDF7DD] py-2 focus:border-[#006D44] outline-none transition-colors resize-none" required></textarea>
            </div>
        </div>
    );
}