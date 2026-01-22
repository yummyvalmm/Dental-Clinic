const Footer = () => {
    return (
        <footer id="footer" className="bg-primary text-white pt-32 pb-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-24">
                    {/* Brand/Philosophy */}
                    <div className="lg:col-span-1 space-y-12">
                        <h2 className="font-serif text-3xl tracking-tight">Nova<span className="italic text-accent ml-0.5">.</span></h2>
                        <p className="text-sm font-light leading-relaxed opacity-60 max-w-xs">
                            Redefining the boundaries of clinical excellence and aesthetic artistry. A multidisciplinary studio for the modern age.
                        </p>
                        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
                            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                            <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="space-y-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 block">The Studio</span>
                        <ul className="space-y-4 text-sm font-light opacity-60">
                            <li><a href="#" className="hover:opacity-100 transition-opacity">Our Philosophy</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">The Team</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">Services Portfolio</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">Private Consultations</a></li>
                        </ul>
                    </div>

                    {/* Concierge */}
                    <div className="space-y-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 block">Concierge</span>
                        <ul className="space-y-4 text-sm font-light opacity-60">
                            <li><a href="tel:+442071234567" className="hover:opacity-100 transition-opacity">+44 (0) 20 7123 4567</a></li>
                            <li><a href="mailto:studio@novadental.com" className="hover:opacity-100 transition-opacity">studio@novadental.com</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">124 Baker St, London</a></li>
                        </ul>
                    </div>

                    {/* Newsletter/Manifesto */}
                    <div className="space-y-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 block">The Journal</span>
                        <p className="text-sm font-light opacity-60 leading-relaxed">
                            Subscribe to our monthly journal on aesthetic innovation and clinical mastery.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] uppercase tracking-[0.3em] focus:outline-none focus:border-white transition-colors"
                            />
                            <button className="absolute right-0 bottom-4 text-xs font-bold btn-liquid px-6 py-2 rounded-full hover:scale-105 transition-transform">SUBMIT</button>
                        </form>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col items-center gap-8 text-[9px] uppercase tracking-[0.4em] font-medium">

                    {/* Trust Badges - Visible Authority */}
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-2">
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-serif font-bold text-xl">GDC</span>
                            <span className="text-[7px] tracking-widest opacity-60">Regulated</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-sans font-black text-lg">CQC</span>
                            <span className="text-[7px] tracking-widest opacity-60">Certified</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-serif italic font-bold text-lg">BACD</span>
                            <span className="text-[7px] tracking-widest opacity-60">Member</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-sans font-bold text-lg">BDA</span>
                            <span className="text-[7px] tracking-widest opacity-60">Good Practice</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 opacity-30 mt-8">
                        <p>© {new Date().getFullYear()} Nova Dental — All Rights Reserved.</p>
                        <div className="flex gap-12">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
