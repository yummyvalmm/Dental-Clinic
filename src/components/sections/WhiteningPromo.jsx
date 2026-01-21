import { Check } from 'lucide-react';

const WhiteningPromo = () => {
    return (
        <section className="py-20 lg:py-32 bg-bg-surface overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="bg-blue-50 rounded-[3rem] p-8 lg:p-20 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <span className="text-white font-bold tracking-wider uppercase text-sm mb-2 block">Cosmetic Excellence</span>
                            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Make your teeth <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    whiter & brighter
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">
                                Our professional whitening treatments can brighten your smile up to 8 shades in a single visit. Safe, effective, and long-lasting.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {['Instant results in 45 minutes', 'Safe for sensitive teeth', 'Long-lasting brilliance'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-medium text-white/80">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-accent">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button className="text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest btn-liquid transition-colors shadow-lg">
                                Book Whitening Session
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=2070&fm=webp"
                                    alt="Bright Smile"
                                    className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                                />
                            </div>
                            {/* Visual accent behind image */}
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl -rotate-3 scale-[1.02] -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhiteningPromo;
