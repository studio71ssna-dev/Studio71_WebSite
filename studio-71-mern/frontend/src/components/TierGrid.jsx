export default function TierGrid({ tiers, selectedTier, onSelect }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map(tier => (
                <div 
                    key={tier.id}
                    onClick={() => onSelect(tier)}
                    className={`p-6 border cursor-pointer transition-all flex flex-col ${selectedTier.id === tier.id ? 'bg-[#006D44] border-[#00ff9d] scale-105 shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'bg-[#111] border-[#222] hover:border-[#006D44]'}`}
                >
                    <h3 className={`font-bold mb-2 ${selectedTier.id === tier.id ? 'text-[#FDF7DD]' : 'text-[#00ff9d]'}`}>{tier.title}</h3>
                    <p className={`text-2xl font-mono mb-4 ${selectedTier.id === tier.id ? 'text-white' : 'text-[#FDF7DD]'}`}>{tier.price.toLocaleString()} BDT</p>
                    <p className={`text-sm flex-grow ${selectedTier.id === tier.id ? 'text-[#e0e0e0]' : 'text-[#a0a0a0]'}`}>{tier.desc}</p>
                </div>
            ))}
        </div>
    );
}