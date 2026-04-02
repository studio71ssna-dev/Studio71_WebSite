import { services } from '../data';

export default function Services() {
    return (
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
    );
}