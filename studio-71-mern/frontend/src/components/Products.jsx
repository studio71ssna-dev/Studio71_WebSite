import { inHouseProducts } from '../data';

export default function Products() {
    return (
        <section id="work" className="container mx-auto px-6 py-16 max-w-6xl">
            <h2 className="section-header text-[#00ff9d] border-l-4 border-[#006D44] pl-4 text-xl tracking-widest uppercase mb-10">In-House Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inHouseProducts.map(p => (
                    <a 
                        key={p.id} 
                        href={p.url !== "#" ? p.url : undefined} 
                        target={p.url !== "#" ? "_blank" : undefined}
                        rel="noopener noreferrer" 
                        className={`project-card bg-[#111] border border-[#222] hover:border-[#006D44] hover:-translate-y-1 transition-all flex flex-col block ${p.url !== "#" ? "cursor-pointer" : "cursor-default opacity-90"}`}
                    >
                        <div className="h-56 bg-cover bg-center border-b border-[#222]" style={{ backgroundImage: `url('/${p.image.replace(/^\//, '')}')` }}></div>
                        <div className="p-6 flex flex-col flex-grow relative">
                            {p.featured && (
                                <div className="absolute top-[-15px] right-4 bg-[#006D44] text-[#FDF7DD] text-[0.6rem] font-bold px-3 py-1 uppercase tracking-widest border border-[#00ff9d]">
                                    Featured
                                </div>
                            )}
                            
                            <h3 className="text-xl font-bold text-[#FDF7DD] mb-1">{p.title}</h3>
                            <p className="text-xs font-bold text-[#00ff9d] mb-4 uppercase tracking-wider">{p.subtitle}</p>
                            <p className="text-[#a0a0a0] text-sm flex-grow mb-6 leading-relaxed">{p.description}</p>
                            <div className="flex gap-2 flex-wrap">
                                {p.tags.map(tag => <span key={tag} className="text-[0.65rem] uppercase tracking-wider bg-[#1a1a1a] text-[#888] border border-[#333] px-3 py-1">{tag}</span>)}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}