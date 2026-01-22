import { motion } from 'framer-motion';
import { Star, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-bg-body">

            {/* Background: Clean Dark Blue for consistency */}

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Content & Authority */}
                    <div className="space-y-8 lg:space-y-10 text-center lg:text-left order-2 lg:order-1">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 border-l-2 border-accent pl-4"
                        >
                            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Est. 2008 • London</span>
                            <span className="w-1 h-1 rounded-full bg-primary/20" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">GDC Accredited</span>
                        </motion.div>

                        {/* Title - Compact & Powerful */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-text-main)] leading-[1.1] tracking-tight"
                        >
                            Mastery in <br />
                            <span className="italic text-[var(--color-text-muted)]">Restorative</span> & <br />
                            <span className="text-accent relative inline-block">
                                Implant Dentistry.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99991 63.8122 1.63861 106.002 2.99997C146.969 4.32174 183.003 6.99997 198.003 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"
                        >
                            Led by <strong className="text-[var(--color-text-main)]">Dr. Sarah Johnson</strong>. We specialize in complex case rehabilitation using minimally invasive microsurgery and digital smile design.
                        </motion.p>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-2"
                        >
                            <button className="px-8 py-3.5 text-white rounded-full font-bold text-xs uppercase tracking-widest btn-liquid hover:text-white flex items-center gap-3 shadow-lg shadow-blue-900/20">
                                Request Consultation <ArrowRight size={16} />
                            </button>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center group-hover:bg-[var(--glass-bg-medium)] group-hover:text-primary transition-all duration-300">
                                    <Play size={16} fill="currentColor" />
                                </div>
                                <span className="text-xs font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors">See Patient Stories</span>
                            </div>
                        </motion.div>

                        {/* Trust Logos */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="pt-10 border-t border-[var(--glass-border)] mt-4"
                        >
                            <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]/50 font-bold mb-4">Recognized Excellence</p>
                            <div className="flex justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                <span className="font-serif text-lg font-bold italic">Vogue</span>
                                <span className="font-sans text-base font-black tracking-tighter">GQ</span>
                                <span className="font-serif text-base font-bold">Harrods</span>
                                <span className="font-sans text-base font-bold tracking-widest">FORBES</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual Story */}
                    <div className="relative order-1 lg:order-2 h-full flex items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10"
                        >
                            <img
                                srcSet="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp 800w, https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80&fm=webp 2000w"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80&fm=webp"
                                alt="Dr Johnson consulting with patient"
                                className="w-full h-full object-cover"
                                loading="eager"
                            />

                            {/* Gradient Overlay for Text Contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-body/80 via-transparent to-transparent opacity-60" />

                            {/* Trust Floating Card */}
                            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl flex items-center justify-between glass-liquid backdrop-blur-md border border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80&fm=webp" className="w-10 h-10 rounded-full object-cover border border-white/50 shadow-sm" alt="Doctor" />
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-white leading-tight">Dr. Sarah Johnson</p>
                                        <p className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Clinical Director</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="fill-accent text-accent" />)}
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Graphic */}
                        <div className="absolute -z-10 top-10 -right-10 w-40 h-40 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow opacity-60">
                            <div className="w-2 h-2 bg-accent rounded-full absolute top-0 left-1/2 -translate-x-1/2" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
