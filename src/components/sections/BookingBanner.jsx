import { Calendar, User, Phone } from 'lucide-react';

const BookingBanner = () => {
    return (
        <section className="py-20 lg:py-32 bg-primary text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="glass-liquid-dark rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Book your appointment today</h2>
                            <p className="text-blue-100 text-lg max-w-md mx-auto lg:mx-0">
                                Ready to transform your smile? Schedule a visit online and we'll contact you to confirm the details.
                            </p>
                        </div>

                        <div className="flex-1 w-full">
                            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-white/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full bg-white/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-colors"
                                    />
                                </div>
                                <div className="relative sm:col-span-2">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            onFocus={(e) => e.target.type = 'date'}
                                            onBlur={(e) => e.target.type = 'text'}
                                            placeholder="Preferred Date"
                                            className="w-full bg-white/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-colors min-h-[58px]"
                                        />
                                    </div>
                                </div>
                                <button type="button" className="sm:col-span-2 text-primary font-bold text-xs uppercase tracking-widest py-4 rounded-xl btn-liquid transition-all shadow-lg">
                                    Schedule Visit
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingBanner;
