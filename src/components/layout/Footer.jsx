const Footer = () => {
    return (
        <footer id="footer" className="bg-primary text-white pt-32 pb-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-24">
                    {/* Brand/Philosophy */}
                    <div className="lg:col-span-1 space-y-12">
                        <h2 className="font-serif text-3xl tracking-tight">Dental Studio<span className="italic text-accent ml-0.5">.</span></h2>
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
                            <li><a href="#" className="hover:opacity-100 transition-opacity">+1 (555) 0123 4567</a></li>
                            <li><a href="#" className="hover:opacity-100 transition-opacity">studio@dental-design.com</a></li>
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

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[9px] uppercase tracking-[0.4em] font-medium">
                    <p>© {new Date().getFullYear()} Aesthetic Dental Practice — All Rights Reserved.</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
