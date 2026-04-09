export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0a] border-t border-[#222] py-10 px-6 mt-auto">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                    <img src="/assets/images/S71_square.png" alt="Studio 71" className="w-6 h-6 object-contain grayscale" />
                    <span className="text-[#a0a0a0] font-black tracking-widest text-xs uppercase">
                        © {currentYear} STUDIO 71
                    </span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 text-[0.7rem] font-bold tracking-widest uppercase">
                    <a href="https://www.linkedin.com/company/team-studio-71/" target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] no-underline hover:text-[#00ff9d] transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61576233790128" target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] no-underline hover:text-[#00ff9d] transition-colors">
                        Facebook
                    </a>
                    <a href="https://studio-71.itch.io/" target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] no-underline hover:text-[#00ff9d] transition-colors">
                        Itch.io
                    </a>
                    {/* Placeholder links for Steam and Google Play if needed in the future */}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] no-underline hover:text-[#00ff9d] transition-colors">
                        Steam
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#a0a0a0] no-underline hover:text-[#00ff9d] transition-colors">
                        Google Play
                    </a>
                </div>

            </div>
        </footer>
    );
}