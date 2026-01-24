import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, User, Phone, Check, ChevronRight, ChevronLeft, Star, Sparkles, Clock, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from '../ui/GlassSurface';
import { useLayout } from '../../context/LayoutContext';
import { useAuth } from '../../context/AuthContext';
import { useNotificationContext } from '../../context/NotificationContext';
import { appointmentService } from '../../services/appointmentService';
import { notificationTypes } from '../../data/notifications';
import { toast } from 'sonner';

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
    const location = useLocation();
    const { setIsNavbarHidden } = useLayout();
    const { user } = useAuth(); // Access auth context
    const { addNotification } = useNotificationContext(); // Notification context
    // Current active step in the wizard flows (1-4)
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Scroll to top and sidebar control
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Sync navbar visibility with step
        if (step === 1) {
            setIsNavbarHidden(false);
        } else {
            setIsNavbarHidden(true);
        }
    }, [step, setIsNavbarHidden]);

    // Handle initial state if passed via navigation (Quick Rebook)
    useEffect(() => {
        if (location.state?.serviceId) {
            setFormData(prev => ({ ...prev, service: location.state.serviceId }));
            setStep(2); // Skip Step 1
            setIsNavbarHidden(true);
        }

        // Cleanup: Always restore navbar when leaving the wizard
        return () => setIsNavbarHidden(false);
    }, [location.state, setIsNavbarHidden]);

    // Smart Auto-Fill for Logged-in Users
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || user.displayName || '',
                // If the user object has a phoneNumber field, use it, else keep empty
                phone: prev.phone || user.phoneNumber || '',
                email: prev.email || user.email || ''
            }));
        }
    }, [user]);

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

    const handleSubmit = async () => {
        if (isSubmitting) return;

        // Construct a proper Date object for the scheduled slot
        // Standard procedure: year, month (0-indexed), day, hours, minutes
        const [hours, minutes] = (formData.time || "09:00").split(':').map(Number);
        const scheduledSlot = new Date(2026, 1, formData.date || 24, hours, minutes);

        setIsSubmitting(true);
        try {
            await appointmentService.createAppointment({
                ...formData,
                scheduledSlot
            }, user?.uid || null);

            // Trigger app-level notification/reminder
            addNotification(
                notificationTypes.CONFIRMATION,
                'Appointment Confirmed',
                `Your appointment for ${formData.service} on Feb ${formData.date} at ${formData.time} is confirmed.`
            );

            toast.success('Appointment scheduled successfully!');
            handleNext();
        } catch (error) {
            console.error("Booking Error:", error);
            toast.error('Failed to schedule appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[85vh] md:min-h-0 relative">

            {/* Contextual Back Button - Top Left */}
            <div className="px-1 mb-4">
                <button
                    onClick={() => step === 1 ? window.history.back() : handleBack()}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-low)] transition-colors border border-[var(--glass-border)]"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

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

            <div className="flex-1 pb-[calc(8rem+env(safe-area-inset-bottom))]"> {/* Padding bottom for sticky footer */}
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

                            <div className="flex flex-col gap-3">
                                {services.map((service) => (
                                    <GlassSurface
                                        key={service.id}
                                        onClick={() => {
                                            if (formData.service === service.id) return; // Prevent double trigger
                                            setFormData({ ...formData, service: service.id });
                                            // Small delay to allow user to see the selection state before transition
                                            setTimeout(() => {
                                                handleNext();
                                            }, 350);
                                        }}
                                        variant="card"
                                        blur="md"
                                        className={`p-5 rounded-[2rem] text-left transition-all duration-300 group relative overflow-hidden active:scale-[0.98] cursor-pointer border
                                            ${formData.service === service.id
                                                ? 'bg-accent/10 border-accent/50 ring-1 ring-accent/60'
                                                : 'border-transparent hover:border-[var(--glass-border)]'}`}
                                        hoverEffect={true}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Icon Container */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0
                                                ${formData.service === service.id
                                                    ? 'bg-accent text-white shadow-glow scale-110'
                                                    : 'bg-[var(--glass-bg-low)] text-[var(--color-text-muted)] group-hover:bg-[var(--glass-bg-medium)] group-hover:text-[var(--color-text-main)]'}`}>
                                                <service.icon size={26} strokeWidth={1.5} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className={`text-lg font-bold leading-tight transition-colors ${formData.service === service.id ? 'text-accent' : 'text-[var(--color-text-main)]'}`}>
                                                        {service.title}
                                                    </h3>


                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-[var(--color-text-muted)]">{service.price} • Start from 30 min</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subtle Active Background Flash */}
                                        {formData.service === service.id && (
                                            <motion.div
                                                layoutId="selected-glow"
                                                className="absolute inset-0 bg-accent/5 z-[-1]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            />
                                        )}
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
                                <h2 className="text-3xl font-serif text-[var(--color-text-main)] mb-2">When?</h2>
                                <p className="text-[var(--color-text-muted)] text-sm">Pick a convenient time slot.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Calendar Panel Visualizer */}
                                <GlassSurface className="p-6" intensity="medium">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-lg font-bold text-[var(--color-text-main)]">February 2026</span>
                                        <span className="text-xs text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Select Day</span>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                            <div key={d} className="text-center text-[10px] font-bold text-[var(--color-text-muted)]/60 uppercase mb-2">{d}</div>
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
                                        <span className="text-xs text-[var(--color-text-muted)] uppercase font-bold tracking-wider px-2">Available Slots</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(time => (
                                            <GlassSurface
                                                key={time}
                                                as="button"
                                                onClick={() => setFormData({ ...formData, time })}
                                                className={`py-3 px-2 flex items-center justify-center text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer
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

                            <GlassSurface className="p-6 mb-6" intensity="low">
                                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[var(--color-text-muted)]/10">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-[var(--color-text-main)] font-bold capitalize">{formData.service?.replace('_', ' ') || 'Treatment'}</h4>
                                        <p className="text-[var(--color-text-muted)] text-sm">Feb {formData.date}, {formData.time}</p>
                                    </div>
                                </div>

                                {/* Smart Summary for Authenticated Users */}
                                {user && !isEditMode ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--glass-bg-low)] border border-[var(--glass-border)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                    <User size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Patient</p>
                                                    <p className="text-sm text-[var(--color-text-main)] font-bold">{formData.name}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setIsEditMode(true)}
                                                className="p-2 rounded-lg hover:bg-[var(--glass-bg-medium)] text-[var(--color-text-muted)] transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[var(--glass-bg-low)] border border-[var(--glass-border)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                                    <Phone size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Contact</p>
                                                    <p className="text-sm text-[var(--color-text-main)] font-bold">{formData.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {user && isEditMode && (
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => setIsEditMode(false)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        )}
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]/50" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] py-4 pl-12 pr-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]/50" size={18} />
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-[var(--glass-bg-low)] border border-[var(--glass-border)] py-4 pl-12 pr-4 text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-accent/50 focus:bg-[var(--glass-bg-medium)] transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                )}
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
                            <h2 className="text-4xl font-serif text-[var(--color-text-main)] mb-4">Confirmed!</h2>
                            <p className="text-[var(--color-text-muted)] mb-8 max-w-xs mx-auto">
                                See you in February. A confirmation has been sent to your phone.
                            </p>
                            <div className="w-full space-y-3">
                                {user ? (
                                    <button
                                        onClick={() => window.location.href = '/history'}
                                        className="w-full py-4 rounded-2xl bg-accent text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
                                    >
                                        View My Appointments
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => window.location.href = '/login'}
                                        className="w-full py-4 rounded-2xl bg-accent text-white font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
                                    >
                                        Create Account to Manage
                                    </button>
                                )}
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full py-4 rounded-2xl bg-[var(--glass-bg-low)] text-[var(--color-text-muted)] font-bold uppercase tracking-widest text-sm hover:bg-[var(--glass-bg-medium)] transition-colors"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Action Footer (Natural Touch Zone) */}
            {
                step > 1 && step < 4 && (
                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-body via-bg-body to-transparent z-50">
                        <div className="container max-w-4xl mx-auto flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="w-14 h-14 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-medium)] hover:text-[var(--color-text-main)] transition-colors shrink-0"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            )}
                            <button
                                onClick={step === 3 ? handleSubmit : handleNext}
                                disabled={(step === 2 && (!formData.date || !formData.time)) || isSubmitting}
                                className={`flex-1 h-14 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-glow
                                ${((step === 2 && (!formData.date || !formData.time)) || isSubmitting)
                                        ? 'bg-[var(--glass-bg-low)] text-[var(--color-text-muted)]/50 cursor-not-allowed border border-[var(--glass-border)]'
                                        : 'bg-accent text-white hover:scale-[1.02] cursor-pointer animate-pulse-subtle active-press'}`}
                            >
                                {isSubmitting ? (
                                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {step === 3 ? 'Confirm Booking' : 'Continue'}
                                        <ChevronRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BookingWizard;
