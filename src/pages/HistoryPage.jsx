import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Clock, AlertCircle, Loader2, FileDown, ChevronDown, Stethoscope, Pill, ChevronLeft } from 'lucide-react';
import GlassSurface from '../components/ui/GlassSurface';
import SkeletonLoader from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import { useNavigate } from 'react-router-dom';

import { appointmentService } from '../services/appointmentService';
import { seedService } from '../services/seedService';
import { toast } from 'sonner';

const HistoryPage = () => {
    const { user, isLoggedIn } = useAuth();
    const { setIsNavbarHidden } = useLayout();
    const navigate = useNavigate();

    // State management
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [expandedId, setExpandedId] = useState(null);

    const filters = ['All', 'Checkup', 'Cleaning', 'Surgery', 'Whitening'];

    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [upcoming, past] = await Promise.all([
                appointmentService.getUpcomingAppointments(user.uid),
                appointmentService.getPastAppointments(user.uid)
            ]);

            const all = [...upcoming, ...past].sort((a, b) =>
                b.scheduledSlot.toMillis() - a.scheduledSlot.toMillis()
            );

            setAppointments(all);
        } catch (err) {
            console.error("Error fetching history:", err);
            setError("Unable to load treatment history.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchHistory();
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn, user]);

    const [isSeeding, setIsSeeding] = useState(false);
    const handleSeed = async () => {
        if (!user) return;
        setIsSeeding(true);
        try {
            await seedService.seedDummyHistory(user.uid);
            toast.success("Dummy data seeded!");
            await fetchHistory();
        } catch (err) {
            toast.error("Failed to seed data.");
        } finally {
            setIsSeeding(false);
        }
    };

    const filteredAppointments = filter === 'All'
        ? appointments
        : appointments.filter(apt => (apt.type === filter || (apt.service && apt.service.includes(filter.toLowerCase()))));

    if (!isLoading && !isLoggedIn) {
        return (
            <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-12 pb-[calc(100px+env(safe-area-inset-bottom))] items-center justify-center px-6">
                <GlassSurface className="p-8 text-center max-w-md w-full" intensity="medium">
                    <AlertCircle className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
                    <h2 className="text-xl text-[var(--color-text-main)] font-serif mb-2">Access Restricted</h2>
                    <p className="text-[var(--color-text-muted)] mb-6">Please log in to view your treatment history.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-white text-bg-body rounded-full font-medium hover:bg-white/90 transition-colors"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="block w-full mt-4 text-sm text-[var(--color-text-muted)]"
                    >
                        Back to Home
                    </button>
                </GlassSurface>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-8 pb-[calc(100px+env(safe-area-inset-bottom))] overscroll-none">
            <div className="container mx-auto px-6 relative z-10 flex-1 max-w-md w-full self-center">

                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 -ml-2 mb-2 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-low)] transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-serif text-[var(--color-text-main)] leading-tight mb-2">My History</h1>
                    <p className="text-[var(--color-text-muted)] text-sm">Medical records & timeline</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap
                                ${filter === f
                                    ? 'bg-accent text-white shadow-glow'
                                    : 'bg-[var(--glass-bg-low)] text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-medium)]'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="relative pb-10">
                    {/* Continuous Vertical Line */}
                    {!isLoading && !error && filteredAppointments.length > 0 && (
                        <motion.div
                            layout
                            className="absolute left-[20px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-[var(--glass-border)] via-[var(--glass-border)] to-transparent z-0 opacity-50"
                        />
                    )}

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-12 flex justify-center"
                            >
                                <SkeletonLoader count={3} />
                            </motion.div>
                        ) : error ? (
                            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <GlassSurface className="p-6 border-red-500/20" intensity="low">
                                    <p className="text-red-200 flex items-center gap-2"><AlertCircle size={18} /> {error}</p>
                                </GlassSurface>
                            </motion.div>
                        ) : filteredAppointments.length > 0 ? (
                            <div className="space-y-6 relative z-10">
                                {filteredAppointments.map((apt, index) => (
                                    <motion.div
                                        layout
                                        key={apt.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4, layout: { duration: 0.3 } }}
                                        className="relative pl-12"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 top-5 w-11 h-11 rounded-full bg-bg-body border-4 border-bg-body flex items-center justify-center z-20">
                                            <div className={`w-full h-full rounded-full flex items-center justify-center border transition-colors duration-300
                                                ${expandedId === apt.id ? 'bg-accent border-accent text-white' : 'bg-[var(--glass-bg-medium)] border-[var(--glass-border)] text-[var(--color-text-muted)]'}`}>
                                                {expandedId === apt.id ? <CheckCircle size={16} /> : <div className="w-2 h-2 rounded-full bg-current opacity-50" />}
                                            </div>
                                        </div>

                                        <GlassSurface
                                            variant="card"
                                            blur="md"
                                            hoverEffect={true}
                                            className={`overflow-hidden rounded-[1.5rem] transition-all duration-300 border
                                                ${expandedId === apt.id
                                                    ? 'bg-[var(--glass-bg-high)] border-accent/30 shadow-glow ring-1 ring-accent/20'
                                                    : 'border-transparent hover:border-[var(--glass-border)]'}`}
                                            onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
                                        >
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border
                                                                ${(apt.type || apt.service) === 'checkup' ? 'text-blue-400 border-blue-400/20 bg-blue-400/10' :
                                                                    (apt.type || apt.service) === 'surgery' ? 'text-rose-400 border-rose-400/20 bg-rose-400/10' :
                                                                        'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'}`}>
                                                                {apt.type || apt.service || 'Visit'}
                                                            </span>
                                                            <span className="text-[var(--color-text-muted)] text-xs">
                                                                {apt.scheduledSlot.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-[var(--color-text-main)] font-bold text-lg leading-tight capitalize">
                                                            {(apt.treatment || apt.service || 'Dental Treatment').replace('_', ' ')}
                                                        </h3>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-[var(--glass-bg-low)] text-[var(--color-text-muted)] transition-transform duration-300 ${expandedId === apt.id ? 'rotate-180 bg-accent/10 text-accent' : ''}`}>
                                                        <ChevronDown size={18} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-text-muted)]">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock size={14} className="text-accent" />
                                                        {apt.scheduledSlot.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Stethoscope size={14} className="text-accent" />
                                                        {apt.dentist || 'Assigned on arrival'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {expandedId === apt.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-5 pt-0 space-y-4">
                                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent mb-4" />

                                                            <div>
                                                                <h4 className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]/60 tracking-wider mb-2">Details</h4>
                                                                <p className="text-[var(--color-text-main)] text-sm leading-relaxed bg-[var(--glass-bg-low)] p-3 rounded-xl border border-[var(--glass-border)]">
                                                                    {apt.notes || 'No additional notes provided for this appointment.'}
                                                                </p>
                                                            </div>

                                                            {apt.prescription && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <div className="p-1 rounded bg-purple-500/10 text-purple-400">
                                                                            <Pill size={12} />
                                                                        </div>
                                                                        <h4 className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]/60 tracking-wider">Prescribed Meds</h4>
                                                                    </div>
                                                                    <p className="text-[var(--color-text-main)] text-sm">{apt.prescription}</p>
                                                                </div>
                                                            )}

                                                            <button className="w-full py-3 mt-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg-low)] flex items-center justify-center gap-2 text-xs font-bold text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-medium)] hover:text-[var(--color-text-main)] transition-colors active:scale-[0.98]">
                                                                <FileDown size={14} />
                                                                Download Summary
                                                            </button>

                                                            {/* Book Again Action for Past appointments */}
                                                            {apt.scheduledSlot.toDate() < new Date() && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate('/book', { state: { serviceId: apt.service || apt.type } });
                                                                    }}
                                                                    className="w-full py-4 mt-2 rounded-xl bg-accent text-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] shadow-glow active:scale-[0.98] transition-all"
                                                                >
                                                                    <Calendar size={14} />
                                                                    Book Again
                                                                </button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </GlassSurface>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <GlassSurface className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]" intensity="low">
                                    <div className="w-16 h-16 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center mb-4 text-[var(--color-text-muted)]/50">
                                        <Calendar size={32} />
                                    </div>
                                    <h3 className="text-[var(--color-text-main)] font-bold mb-2">No Records Found</h3>
                                    <p className="text-[var(--color-text-muted)] text-sm max-w-[200px] mb-6">You haven't had any appointments in this category yet.</p>

                                    <button
                                        onClick={handleSeed}
                                        disabled={isSeeding}
                                        className="px-6 py-3 rounded-2xl bg-accent text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
                                    >
                                        {isSeeding ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                                        Seed Test Data
                                    </button>
                                </GlassSurface>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div >
    );
};

export default HistoryPage;
