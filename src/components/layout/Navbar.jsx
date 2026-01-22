import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, Phone, User, Settings, Globe, Shield, LifeBuoy, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import GlassSurface from '../ui/GlassSurface';
import Surface from '../ui/Surface';
import NotificationCenter from '../ui/NotificationCenter';
import ThemeToggle from '../ui/ThemeToggle';
import { mockNotifications } from '../../data/notifications';
import { useLayout } from '../../context/LayoutContext';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    const { isNavbarHidden } = useLayout();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const location = useLocation();

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

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
            <nav className={`fixed top-0 left-0 right-0 z-[60] py-4 transition-all duration-500 ${isNavbarHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}>
                <div className="container mx-auto px-4 md:px-6 max-w-6xl transition-all duration-500 ease-in-out">
                    {/* Clean, subtle navbar */}
                    <Surface
                        elevation="low"
                        background="subtle"
                        className="flex items-center justify-between rounded-full px-6 py-3 backdrop-blur-xl"
                    >

                        {/* Logo Section */}
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg overflow-hidden group-hover:shadow-blue-500/30 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600"></div>
                                    <span className="relative z-10">N</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-serif text-xl tracking-tight text-[var(--color-text-main)] leading-none">Nova</span>
                                    <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-[var(--color-text-muted)] leading-none mt-1 group-hover:text-blue-400 transition-colors">Dental</span>
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
                                    className="relative text-sm font-medium transition-colors py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Action Area (UX Easy) */}
                        <div className="flex items-center gap-4">
                            {/* Phone Icon - Subtle but handy - Touch Target 44px */}
                            <a href="tel:+442071234567" aria-label="Call Us" className="hidden xl:flex items-center justify-center w-11 h-11 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                                <Phone size={20} />
                            </a>

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Notification Bell - Touch Target 44px */}
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                aria-label="Notifications"
                                className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--glass-bg-low)] hover:bg-[var(--glass-bg-medium)] text-[var(--color-text-main)] transition-colors"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-bg-body">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Primary CTA - Visible & Clear */}
                            <Link to="/book" className="hidden sm:flex items-center gap-2 text-blue-900 border border-white/40 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold btn-liquid hover:text-blue-700 transition-all active:scale-95">
                                <span>Book Visit</span>
                                <ArrowRight size={14} className="hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                    </Surface>
                </div>
            </nav>

            {/* Mobile Dropdown Menu (Full Screen) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[55] lg:hidden flex items-center justify-center bg-bg-body/95 backdrop-blur-2xl"
                    >
                        <div className="w-full max-w-md px-6">
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                                }}
                                className="space-y-4"
                            >
                                {[
                                    { label: 'Login / Sign Up', path: '/login', icon: User },
                                    { label: 'My Insurance', path: '#', icon: Shield },
                                    { label: 'Language', path: '#', icon: Globe, value: 'EN' },
                                    { label: 'Help & Support', path: '/hotline', icon: LifeBuoy }
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
                                        >
                                            <GlassSurface
                                                className="group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-300 active:scale-[0.98] cursor-pointer"
                                                intensity="medium"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                                                        <item.icon size={24} strokeWidth={1.5} />
                                                    </div>
                                                    <span className="text-xl font-semibold tracking-tight text-[var(--color-text-main)] group-hover:text-[var(--color-text-main)] transition-colors">{item.label}</span>
                                                </div>
                                                {item.value ? (
                                                    <span className="text-xs font-bold text-[var(--color-text-muted)] bg-[var(--glass-bg-low)] px-3 py-1.5 rounded-full border border-[var(--glass-border)]">{item.value}</span>
                                                ) : (
                                                    <ChevronRight size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] group-hover:translate-x-1 transition-all duration-300" />
                                                )}
                                            </GlassSurface>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >

            {/* Notification Center */}
            < NotificationCenter
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
            />
        </>
    );
};

export default Navbar;
