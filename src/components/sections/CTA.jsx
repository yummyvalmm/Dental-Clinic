import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="py-16 lg:py-24 bg-bg-body overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="relative bg-primary rounded-[2.5rem] p-12 md:p-16 lg:p-20 text-center text-white overflow-hidden shadow-2xl">
                    {/* Decorative background circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-xs uppercase tracking-[0.5em] font-bold opacity-40 block">Reservations</span>
                            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                                Secure your <br /><span className="italic">private session</span>.
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-light opacity-60 leading-relaxed max-w-2xl mx-auto"
                        >
                            Begin your journey towards a refined aesthetic. Our team will contact you for a private consultation to discuss your vision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                        >
                            <button className="px-10 py-4 text-primary rounded-full font-bold text-xs uppercase tracking-widest btn-liquid hover:px-12 transition-all duration-500 shadow-xl">
                                Request Appointment
                            </button>
                            <button className="px-10 py-4 border border-white/20 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-500">
                                Contact Studio
                            </button>
                        </motion.div>
                    </div>

                    {/* Subtext */}
                    <div className="mt-20 opacity-20 text-[10px] uppercase tracking-[0.4em] font-medium">
                        Studio 01 — Registered Medical Practice
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
