import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, Phone, User, Settings, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import GlassSurface from '../ui/GlassSurface';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Studio', href: '/studio' },
        { name: 'Menu', href: '/services' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[50] py-4 transition-all duration-500">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl transition-all duration-500 ease-in-out">
                    <GlassSurface className="flex items-center justify-between rounded-full px-6 py-3" intensity="high">

                        {/* Logo Section */}
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-500">
                                    D
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-serif text-xl tracking-tight text-white leading-none">DentalStudio</span>
                                    <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-white/40 leading-none mt-1 group-hover:text-blue-400 transition-colors">London</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-10">
                            {[
                                { name: 'Home', path: '/', hash: '#hero' },
                                { name: 'The Studio', path: '/studio', hash: '#about' },
                                { name: 'Treatments', path: '/services', hash: '#services' },
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.hash}
                                    className="relative text-sm font-medium transition-colors py-2 text-white/70 hover:text-white"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Action Area (UX Easy) */}
                        <div className="flex items-center gap-4">
                            {/* Phone Icon - Subtle but handy */}
                            <a href="tel:+442071234567" aria-label="Call Us" className="hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                <Phone size={18} />
                            </a>

                            {/* Primary CTA - Visible & Clear */}
                            <Link to="/book" className="hidden sm:flex items-center gap-2 text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold btn-liquid hover:text-white transition-all active:scale-95">
                                <span>Book Visit</span>
                                <ArrowRight size={14} className="hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Mobile Toggle */}
                            <button
                                aria-label="Toggle Menu"
                                className="lg:hidden p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <div className="space-y-1.5 w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-5'}`} />
                                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-5'}`} />
                                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
                                </div>
                            </button>
                        </div>

                    </GlassSurface>
                </div>
            </nav>

            {/* Mobile Dropdown Menu (Full Screen) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <GlassSurface
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 pt-32 lg:hidden flex flex-col"
                        intensity="high"
                    >
                        <div className="container mx-auto px-6 h-full flex flex-col">
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                                }}
                                className="space-y-4 flex-1"
                            >
                                {[
                                    { label: 'Login', path: '/login', icon: User },
                                    { label: 'Settings', path: '/settings', icon: Settings },
                                    { label: 'Language', path: '#', icon: Globe, value: 'EN' }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: 20 }
                                        }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="glass-liquid-dark group flex items-center justify-between p-5 rounded-3xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                                                    <item.icon size={22} strokeWidth={1.5} />
                                                </div>
                                                <span className="text-xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">{item.label}</span>
                                            </div>
                                            {item.value ? (
                                                <span className="text-xs font-bold text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">{item.value}</span>
                                            ) : (
                                                <ChevronRight size={20} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                                    className="pt-12 flex flex-col items-center gap-6 opacity-30 mt-auto pb-12"
                                >
                                    <div className="w-16 h-1 bg-white/10 rounded-full" />
                                    <div className="flex gap-8">
                                        <span className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">Instagram</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">LinkedIn</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </GlassSurface>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
