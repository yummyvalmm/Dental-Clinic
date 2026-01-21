import { motion } from 'framer-motion';

import { testimonials } from '../../data/testimonials';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 lg:py-32 bg-bg-surface overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/30 block mb-10 lg:mb-16">The Experience</span>

                    <div className="space-y-12 lg:space-y-20">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="space-y-6 lg:space-y-10"
                            >
                                <h3 className="text-2xl md:text-5xl lg:text-6xl font-serif text-white leading-tight font-light italic">
                                    "{item.quote}"
                                </h3>

                                <div className="space-y-2">
                                    <span className="text-base font-serif text-white block">{item.author}</span>
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 block">— Patient Story: {item.case}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 lg:mt-20 pt-12 lg:pt-16 border-t border-primary/5">
                        <button className="text-xs uppercase tracking-widest font-bold text-primary flex items-center gap-6 mx-auto group btn-liquid px-8 py-3.5 rounded-full">
                            View Case Studies
                            <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                →
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
