export default function Hero() {
    return (
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
    );
}