import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Clock, AlertCircle, Loader2, FileDown, ChevronDown, Stethoscope, Pill } from 'lucide-react';
import GlassSurface from '../components/ui/GlassSurface';
import SkeletonLoader from '../components/ui/LoadingSpinner'; // Refactored to SkeletonLoader
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { appointmentService } from '../services/appointmentService';

const HistoryPage = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // State management
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [expandedId, setExpandedId] = useState(null);

    const filters = ['All', 'Checkup', 'Cleaning', 'Surgery', 'Whitening'];

    // Secure data fetching via Service
    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        const fetchHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch filtered data directly from service
                // Note: In real app, we might fetch all and filter locally, or filter API side.
                // Here we fetch all then filter locally for UI reactivity, or assume service handles it.
                // Let's rely on service filtering for cleaner component code, or just fetch all.
                // Based on service impl, it accepts filter.
                const data = await appointmentService.getHistory(user.uid, 'All');
                setAppointments(data);
            } catch (err) {
                console.error("Error fetching history:", err);
                setError("Unable to load treatment history.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [isLoggedIn, navigate, user]);

    const filteredAppointments = filter === 'All'
        ? appointments
        : appointments.filter(apt => apt.type === filter || apt.treatment.includes(filter));

    if (!isLoading && !isLoggedIn) {
        return (
            <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-24 pb-32 items-center justify-center px-6">
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
                </GlassSurface>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-32 pb-[100px] overscroll-none">
            <div className="container mx-auto px-6 relative z-10 flex-1 max-w-md w-full self-center">

                {/* Header */}
                <div className="mb-6">
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
                <div className="min-h-[200px] relative">
                    {/* Vertical Timeline Line */}
                    {!isLoading && !error && filteredAppointments.length > 0 && (
                        <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-gradient-to-b from-[var(--glass-border)] via-[var(--glass-border)] to-transparent z-0" />
                    )}

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-4"
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
                            <div className="space-y-3 relative z-10">
                                {filteredAppointments.map((apt, index) => (
                                    <motion.div
                                        key={apt.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-10"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 top-6 w-10 h-10 rounded-full bg-bg-body border-4 border-bg-body flex items-center justify-center z-20">
                                            <div className="w-full h-full rounded-full bg-accent/20 flex items-center justify-center">
                                                <CheckCircle className="text-accent" size={16} />
                                            </div>
                                        </div>

                                        <GlassSurface
                                            variant="card"
                                            blur="lg"
                                            hoverEffect={true}
                                            className={`overflow-hidden rounded-[2rem] ${expandedId === apt.id ? 'bg-[var(--glass-bg-high)]' : ''}`}
                                            onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
                                        >
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-[var(--color-text-main)] font-bold text-lg leading-tight">{apt.treatment}</h3>
                                                        <p className="text-[var(--color-text-muted)] text-xs mt-1">{apt.date} • {apt.time}</p>
                                                    </div>
                                                    <div className={`transform transition-transform duration-300 text-[var(--color-text-muted)] ${expandedId === apt.id ? 'rotate-180' : ''}`}>
                                                        <ChevronDown size={20} />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                                                    <Stethoscope size={14} />
                                                    {apt.dentist}
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {expandedId === apt.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="bg-black/20"
                                                    >
                                                        <div className="p-5 pt-2 border-t border-white/5 space-y-4">
                                                            <div>
                                                                <h4 className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]/60 tracking-wider mb-1">Doctor's Notes</h4>
                                                                <p className="text-[var(--color-text-main)] text-sm">{apt.notes}</p>
                                                            </div>
                                                            {apt.prescription && (
                                                                <div>
                                                                    <h4 className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]/60 tracking-wider mb-1 flex items-center gap-1.5">
                                                                        <Pill size={12} /> Prescription
                                                                    </h4>
                                                                    <p className="text-[var(--color-text-main)] text-sm">{apt.prescription}</p>
                                                                </div>
                                                            )}
                                                            <button className="w-full py-3 mt-2 rounded-xl border border-[var(--glass-border)] flex items-center justify-center gap-2 text-xs font-bold text-[var(--color-text-muted)] hover:bg-[var(--glass-bg-low)] transition-colors">
                                                                <FileDown size={14} />
                                                                Download Record (PDF)
                                                            </button>
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
                                <GlassSurface className="p-8 text-center" intensity="low">
                                    <p className="text-[var(--color-text-muted)]">No records found for this filter.</p>
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
