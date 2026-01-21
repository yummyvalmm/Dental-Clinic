import { useState } from 'react';
import { Calendar, User, Phone, Check, ChevronRight, ChevronLeft, Star, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from '../ui/GlassSurface';

const BookingWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: null,
        date: null,
        time: null,
        name: '',
        phone: '',
        email: ''
    });

    const services = [
        { id: 'checkup', title: 'General Checkup', icon: Star, price: '$50+' },
        { id: 'whitening', title: 'Whitening', icon: Sparkles, price: '$199' },
        { id: 'cleaning', title: 'Deep Cleaning', icon: Clock, price: '$99+' },
        { id: 'cosmetic', title: 'Cosmetic Consult', icon: User, price: 'Free' }
    ];

    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Progress hidden for cleaner native look */}

            <AnimatePresence mode="wait">
                {/* Step 1: Services (Individual Glass Cards) */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="px-4">
                            <h2 className="text-3xl font-serif text-white mb-2">Select Treatment</h2>
                            <p className="text-white/40 text-sm">Choose the service you'd like to book.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service) => (
                                <GlassSurface
                                    key={service.id}
                                    onClick={() => {
                                        setFormData({ ...formData, service: service.id });
                                        handleNext();
                                    }}
                                    className={`p-4 rounded-3xl text-left transition-all duration-300 group relative overflow-hidden active:scale-[0.98] cursor-pointer
                                        ${formData.service === service.id
                                            ? 'bg-accent/10 border-accent/50 ring-1 ring-accent/50'
                                            : ''}`}
                                    intensity="medium"
                                    hoverEffect={true}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div className={`p-3 rounded-2xl transition-colors ${formData.service === service.id ? 'bg-accent text-white shadow-glow' : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'}`}>
                                            <service.icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${formData.service === service.id ? 'border-accent text-accent' : 'border-white/10 text-white/40'}`}>
                                            {service.price}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">{service.title}</h3>
                                    <p className="text-xs text-white/50 leading-tight group-hover:text-white/70 transition-colors">Professional dental care designed for your specific needs.</p>
                                </GlassSurface>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Date & Time (Glass Panels & Items) */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="px-4">
                            <h2 className="text-3xl font-serif text-white mb-2">Availability</h2>
                            <p className="text-white/40 text-sm">Select a date and time that works for you.</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Calendar Panel */}
                            <GlassSurface className="rounded-[2.5rem] p-8" intensity="high">
                                <span className="text-xs uppercase tracking-widest text-white/40 font-bold block mb-6 text-center">February 2026</span>
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                        <div key={d} className="text-center text-[10px] font-bold text-white/20 uppercase">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 28 }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setFormData({ ...formData, date: i + 1 })}
                                            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300
                                                ${formData.date === i + 1
                                                    ? 'bg-accent text-white shadow-glow scale-110 z-10'
                                                    : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </GlassSurface>

                            {/* Time Slots (Individual Glass) */}
                            <div className="space-y-4">
                                <span className="text-xs uppercase tracking-widest text-white/40 font-bold px-4">Available Times</span>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map(time => (
                                        <GlassSurface
                                            key={time}
                                            onClick={() => {
                                                setFormData({ ...formData, time });
                                                handleNext();
                                            }}
                                            className={`p-4 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer
                                                ${formData.time === time
                                                    ? 'bg-accent/10 border-accent/50 text-white shadow-glow ring-1 ring-accent/50'
                                                    : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                            intensity="medium"
                                            hoverEffect={true}
                                        >
                                            {time}
                                        </GlassSurface>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Details (Glass Form) */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="px-4 mb-8 text-center">
                            <h2 className="text-3xl font-serif text-white mb-2">Final Details</h2>
                            <p className="text-white/50 text-sm">
                                Booking <span className="text-accent font-bold">{formData.service}</span> on <span className="text-white font-bold">Feb {formData.date}</span> at <span className="text-white font-bold">{formData.time}</span>
                            </p>
                        </div>

                        <GlassSurface className="rounded-[2.5rem] p-8 space-y-6" intensity="high">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent transition-colors" size={20} />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(4)}
                                className="w-full py-5 btn-liquid rounded-2xl text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-glow mt-4"
                            >
                                Confirm Booking
                            </button>
                        </GlassSurface>
                    </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-20 px-4"
                    >
                        <div className="w-28 h-28 rounded-full bg-accent/10 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(37,99,235,0.3)] border border-accent/20">
                            <Check size={56} className="text-accent" />
                        </div>
                        <h2 className="text-4xl font-serif text-white mb-4">Confirmed</h2>
                        <p className="text-white/60 max-w-sm mb-12 text-lg leading-relaxed">
                            Your appointment is set. We've sent a confirmation to your email.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="glass-liquid-dark px-10 py-4 rounded-full text-white hover:bg-white hover:text-primary transition-all text-xs font-bold uppercase tracking-widest"
                        >
                            Return Home
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back Button (Floating Clean) */}
            {step > 1 && step < 4 && (
                <div className="flex justify-start mt-8 px-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingWizard;
