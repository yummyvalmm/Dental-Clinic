import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { premiumServices } from '../../data/services';

const Services = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="services" className="py-20 lg:py-32 bg-bg-body overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 lg:mb-24 border-b border-[var(--glass-border)] pb-12">
                    <div className="max-w-2xl">
                        <span className="text-xs uppercase tracking-[0.4em] font-bold text-blue-600 block mb-6">Our Expertise</span>
                        <h2 className="text-4xl lg:text-7xl font-serif text-[var(--color-text-main)] leading-tight">
                            Curated <span className="text-accent italic">specialties</span> <br /> for refined results.
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0 max-w-xs">
                        <p className="text-[var(--color-text-muted)] font-medium leading-relaxed">
                            We specialize in complex multidisciplinary cases, ensuring every detail of your care is handled by an expert.
                        </p>
                    </div>
                </div>

                {/* Interactive List */}
                <div className="relative">
                    {premiumServices.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group relative border-b border-[var(--glass-border)] py-8 md:py-16 transition-all duration-500 cursor-pointer rounded-3xl px-6 -mx-6 md:hover:bg-[var(--glass-bg-low)] md:hover:border-transparent md:hover:shadow-glow md:hover:z-30`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 relative z-30">
                                {/* ID & Category */}
                                <div className="flex items-center gap-4 md:gap-8 w-full md:w-1/4 mb-4 md:mb-0">
                                    <span className="text-sm font-bold text-[var(--color-text-muted)]/50 font-serif italic">#{service.id}</span>
                                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-600 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-x-2 md:group-hover:translate-x-0">
                                        {service.category}
                                    </span>
                                </div>

                                {/* Title & Features */}
                                <div className="flex-1 flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[var(--color-text-main)] group-hover:translate-x-2 transition-transform duration-500 drop-shadow-md">
                                            {service.title}
                                        </h3>
                                        <ArrowUpRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 text-blue-600 shrink-0" size={32} />
                                    </div>

                                    {/* Mobile/Tablet: Show Features List clearly with spacing */}
                                    <div className="flex flex-col gap-3 md:hidden pl-2">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[var(--color-text-muted)]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                <span className="text-sm font-medium tracking-wide">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop: Hover Description (Keep existing behavior but refined) */}
                                    <div className="hidden md:block mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">{service.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Image Reveal */}
                            {!isMobile && (
                                <div
                                    className={`hidden md:block absolute right-[20%] top-1/2 -translate-y-1/2 w-96 aspect-[4/3] pointer-events-none glass-liquid p-3 rounded-3xl z-20 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) opacity-0 scale-90 rotate-6 ${hoveredIndex === index ? 'opacity-100 scale-100 rotate-0' : ''
                                        }`}
                                >
                                    <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
