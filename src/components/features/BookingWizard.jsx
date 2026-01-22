import { useState, useEffect } from 'react';
import { Calendar, User, Phone, Check, ChevronRight, ChevronLeft, Star, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from '../ui/GlassSurface';
import { useLayout } from '../../context/LayoutContext';

/**
 * BookingWizard Component
 * 
 * A mobile-optimized booking wizard.
 * 
 * Enhancements:
 * - Segmented Progress Bar
 * - Sticky Bottom Action Bar (Thumb-friendly)
 * - Enhanced Touch Targets
 */
const BookingWizard = () => {
    const { setIsNavbarHidden } = useLayout();
    // Current active step in the wizard flows (1-4)
    const [step, setStep] = useState(1);

    // Control Navbar visibility based on step
    useEffect(() => {
        if (step > 1 && step < 4) {
            setIsNavbarHidden(true);
        } else {
            setIsNavbarHidden(false);
        }

        // Cleanup: ensure navbar returns when unmounting
        return () => setIsNavbarHidden(false);
    }, [step, setIsNavbarHidden]);

    // Central state for all booking data collected across steps
    const [formData, setFormData] = useState({
        service: null, // ID of the selected service
        date: null,    // Selected day of the month
        time: null,    // Selected time slot
        name: '',      // Patient name
        phone: '',     // Patient phone
        email: ''      // Patient email
    });

    /**
     * List of available dental services.
     */
    const services = [
        { id: 'checkup', title: 'General Checkup', icon: Star, price: '$50+' },
        { id: 'whitening', title: 'Whitening', icon: Sparkles, price: '$199' },
        { id: 'cleaning', title: 'Deep Cleaning', icon: Clock, price: '$99+' },
        { id: 'cosmetic', title: 'Cosmetic Consult', icon: User, price: 'Free' }
    ];

    // Mock available time slots
    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    // Navigation handlers
    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    // Progress Bar Helper
    const totalSteps = 4;
    const progressPercentage = (step / totalSteps) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[85vh] md:min-h-0">

            {/* Progress Bar - Header */}
            <div className="mb-6 px-1">
                <div className="flex justify-between text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">
                    <span>Step {step} of {totalSteps}</span>
                    <span>{step === 4 ? 'Complete' : 'In Progress'}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--glass-bg-low)] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="flex-1 pb-32"> {/* Padding bottom for sticky footer */}
                <AnimatePresence mode="wait">
                    {/* ---------------- STEP 1: SELECT TREATMENT ---------------- */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-serif text-[var(--color-text-main)] mb-2">Select Treatment</h2>
                                <p className="text-[var(--color-text-muted)] text-sm">Choose the service you'd like to book.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <GlassSurface
                                        key={service.id}
                                        onClick={() => {
                                            // Update state selection and auto-advance
                                            setIsNavbarHidden(true); // Immediate hide for snappy feel
                                            setFormData({ ...formData, service: service.id });
                                            handleNext();
                                        }}
                                        className={`p-5 rounded-3xl text-left transition-all duration-300 group relative overflow-hidden active:scale-[0.98] cursor-pointer
                                            ${formData.service === service.id
                                                ? 'bg-accent/10 border-accent/50 ring-1 ring-accent/50'
                                                : ''}`}
                                        intensity="medium"
                                        hoverEffect={true}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <div className={`p-3 rounded-2xl transition-colors ${formData.service === service.id ? 'bg-accent text-white shadow-glow' : 'bg-[var(--glass-bg-low)] text-[var(--color-text-muted)]'}`}>
                                                <service.icon size={24} strokeWidth={1.5} />
                                            </div>
                                            {/* Checkbox removed as requested for direct navigation */}
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-1">{service.title}</h3>
                                        <p className="text-xs text-[var(--color-text-muted)]">{service.price} • 30-60 min</p>
                                    </GlassSurface>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ---------------- STEP 2: DATE & TIME ---------------- */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-serif text-white mb-2">When?</h2>
                                <p className="text-white/40 text-sm">Pick a convenient time slot.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Calendar Panel Visualizer */}
                                <GlassSurface className="rounded-[2rem] p-6" intensity="medium">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-lg font-bold text-[var(--color-text-main)]">February 2026</span>
                                        <span className="text-xs text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Select Day</span>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                            <div key={d} className="text-center text-[10px] font-bold text-white/20 uppercase mb-2">{d}</div>
                                        ))}
                                        {Array.from({ length: 28 }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setFormData({ ...formData, date: i + 1 })}
                                                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative
                                                    ${formData.date === i + 1
                                                        ? 'bg-accent text-white shadow-glow z-10'
                                                        : 'text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-low)] hover:text-[var(--color-text-main)]'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                </GlassSurface>

                                {/* Time Slots Selection */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-white/40 uppercase font-bold tracking-wider px-2">Available Slots</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(time => (
                                            <GlassSurface
                                                key={time}
                                                as="button"
                                                onClick={() => setFormData({ ...formData, time })}
                                                className={`py-3 px-2 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer
                                                    ${formData.time === time
                                                        ? 'bg-accent/20 border-accent/50 text-[var(--color-text-main)] shadow-glow ring-1 ring-accent/50'
                                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
                                                intensity="low"
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

                    {/* ---------------- STEP 3: PATIENT DETAILS ---------------- */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl font-serif text-[var(--color-text-main)] mb-2">Final Step</h2>
                                <p className="text-[var(--color-text-muted)] text-sm">Review and confirm.</p>
                            </div>

                            <GlassSurface className="p-6 rounded-3xl mb-6" intensity="low">
                                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-white/10">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{formData.service || 'Treatment'}</h4>
                                        <p className="text-white/60 text-sm">Feb {formData.date}, {formData.time}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] rounded-2xl py-4 pl-12 pr-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] rounded-2xl py-4 pl-12 pr-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </GlassSurface>
                        </motion.div>
                    )}

                    {/* ---------------- STEP 4: CONFIRMATION ---------------- */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center py-10"
                        >
                            <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(37,99,235,0.3)] border border-accent/20">
                                <Check size={64} className="text-accent" />
                            </div>
                            <h2 className="text-4xl font-serif text-white mb-4">Confirmed!</h2>
                            <p className="text-white/60 mb-8 max-w-xs mx-auto">
                                See you in February. A confirmation has been sent to your phone.
                            </p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full py-4 rounded-2xl bg-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-bg-body transition-colors"
                            >
                                Back to Home
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Action Footer (Natural Touch Zone) */}
            {step > 1 && step < 4 && (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-body via-bg-body to-transparent z-50">
                    <div className="container max-w-4xl mx-auto flex gap-4">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors shrink-0"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={step === 2 && (!formData.date || !formData.time)}
                            className={`flex-1 h-14 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-glow
                                ${step === 2 && (!formData.date || !formData.time)
                                    ? 'bg-white/10 text-white/20 cursor-not-allowed'
                                    : 'bg-accent text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer'}`}
                        >
                            {step === 3 ? 'Confirm Booking' : 'Continue'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingWizard;
