import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 lg:py-32 bg-bg-body overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Side - Big & Dramatic */}
                    <div className="flex-1 w-full relative">
                        <motion.div
                            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="relative aspect-[3/4] rounded-[2rem] overflow-hidden group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1542884841-33167f225301?auto=format&fit=crop&q=80&w=1974&fm=webp"
                                alt="Clinic Environment"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-linear"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-primary/40 to-transparent">
                                <span className="text-white text-xs uppercase tracking-[0.4em] font-medium">Inside the Studio</span>
                            </div>
                        </motion.div>

                        {/* Background Texture */}
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-soft/30 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Text Side - Elegant Storytelling */}
                    <div className="flex-1 space-y-10 lg:space-y-12">
                        <div className="space-y-6">
                            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-white/40 block">Our Philosophy</span>
                            <h2 className="text-4xl lg:text-6xl font-serif text-white leading-tight">
                                Where <span className="italic">precision</span> <br /> meets artistry.
                            </h2>
                        </div>

                        <div className="space-y-8 max-w-lg">
                            <p className="text-xl text-white/80 font-light leading-relaxed">
                                Founded on the principle that dentistry is both a science and a craft, we approach every smile as a unique canvas.
                            </p>

                            <div className="space-y-6">
                                <p className="text-base text-white/60 leading-relaxed">
                                    Our studio is designed to be a sanctuary. We've removed the clinical coldness of traditional dentistry and replaced it with a warm, serene environment where you can truly relax.
                                </p>
                                <p className="text-base text-white/60 leading-relaxed">
                                    Utilizing the latest in digital diagnostics and artisanal material selection, we provide results that are not just technically perfect, but biologically harmonious and aesthetically stunning.
                                </p>
                            </div>

                            <div className="pt-6 lg:pt-8 flex flex-col sm:flex-row gap-8 lg:gap-12 items-baseline">
                                <div>
                                    <span className="block text-4xl font-serif text-white">15+</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Years of Mastery</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-serif text-white">2.4k</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Refined Smiles</span>
                                </div>
                            </div>

                            <div className="pt-10">
                                <button className="group flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-primary btn-liquid px-8 py-3.5 rounded-full">
                                    The Studio Journey
                                    <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        →
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
