import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const VisitPage = () => {
    return (
        <div className="relative w-full h-[100dvh] bg-bg-body overflow-hidden overscroll-none touch-none fixed inset-0">

            {/* 1. Background Map - Full Screen (Desktop) / Static Image (Mobile) */}
            {/* 1. Background Map - Full Screen (Desktop Only) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none lg:pointer-events-auto">
                <div className="hidden lg:block w-full h-full grayscale opacity-60 hover:opacity-80 transition-opacity duration-1000">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5464673623947!2d-0.1656846840742187!3d51.49909247963385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876054238e55555%3A0x6b1076612df3046f!2sHarrods!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>
            </div>

            {/* 2. Content Overlay - Centered/Floating */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center pt-24 pb-24 px-4 lg:p-12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-auto w-full max-h-full lg:h-auto max-w-md mx-auto lg:max-w-4xl glass-liquid-dark rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl ring-1 ring-white/10 lg:mt-0"
                >

                    {/* Header Image / Map Highlight (Desktop Only) or nice visual */}
                    <div className="hidden lg:block lg:w-1/2 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&fm=webp"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="London Studio"
                        />
                        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
                        <div className="absolute bottom-8 left-8">
                            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white mb-2 block">London</span>
                            <h2 className="text-3xl font-serif text-white">Knightsbridge</h2>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center bg-bg-surface/50 backdrop-blur-xl">
                        <div className="mb-8">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent block mb-3">The Destination</span>
                            <h1 className="text-3xl font-serif text-white leading-tight">
                                Visit the <span className="text-accent italic">Studio</span>.
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <MapPin size={20} className="text-white/40 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Address</p>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        12 Hans Road, Knightsbridge <br />
                                        London, SW3 1RT
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Clock size={20} className="text-white/40 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Hours</p>
                                    <p className="text-sm text-white/60">Mon - Fri: 09:00 - 18:00</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Phone size={20} className="text-white/40 mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Concierge</p>
                                    <p className="text-sm text-white/60">+44 (0) 20 7123 4567</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=12+Hans+Road+Knightsbridge+London+SW3+1RT"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3.5 text-xs font-bold uppercase tracking-widest bg-white text-primary rounded-full hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
                            >
                                <Navigation size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                                Open Maps
                            </a>
                        </div>
                    </div>

                </motion.div>
            </div>

        </div>
    );
};

export default VisitPage;
