import { motion } from 'framer-motion';

import { specialists } from '../../data/team';

const Team = () => {
    return (
        <section id="team" className="py-20 lg:py-32 bg-bg-body overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="max-w-2xl">
                        <span className="text-xs uppercase tracking-[0.4em] font-semibold text-white/40 block mb-6">Mastery & Care</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                            The <span className="italic text-accent">clinical</span> <br /> masterminds.
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-white/60 font-light max-w-[280px] mb-8 ml-auto">
                            A multidisciplinary team of world-class specialists dedicated to clinical excellence.
                        </p>
                        <button className="mt-12 px-8 py-3.5 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 btn-liquid">
                            Meet our full staff
                        </button>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {specialists.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-accent-soft mb-8">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                                />

                                {/* Info Overlay */}
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10 text-white">
                                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 block mb-2">{member.specialty}</span>
                                        <button className="text-xs font-semibold underline underline-offset-4">Read Biography</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 text-center md:text-left">
                                <h3 className="text-2xl font-serif text-white">{member.name}</h3>
                                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
