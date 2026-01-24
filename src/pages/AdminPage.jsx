import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Phone,
    Mail,
    Search,
    ChevronLeft,
    TrendingUp,
    AlertCircle,
    Activity,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';
import GlassSurface from '../components/ui/GlassSurface';
import Skeleton from '../components/ui/Skeleton';
import { toast } from 'sonner';

// Internal Helper for safe deletion
const PurgeButton = ({ onPurge }) => {
    const [step, setStep] = useState('initial'); // initial, confirming

    useEffect(() => {
        if (step === 'confirming') {
            const timer = setTimeout(() => setStep('initial'), 3000); // Reset after 3s
            return () => clearTimeout(timer);
        }
    }, [step]);

    if (step === 'confirming') {
        return (
            <button
                onClick={onPurge}
                className="px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap bg-rose-500 text-white shadow-lg animate-pulse"
            >
                Confirm Delete?
            </button>
        );
    }

    return (
        <button
            onClick={() => setStep('confirming')}
            className="px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white"
        >
            Purge All
        </button>
    );
};

const AdminPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const data = await appointmentService.getAllAppointments();
            setAppointments(data);
        } catch (error) {
            console.error("AdminPage: Error fetching appointments:", error);
            toast.error("Failed to load appointments");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Safe Date Parsing Helper
    const getDate = (slot) => {
        if (!slot) return null;
        if (slot.toDate && typeof slot.toDate === 'function') return slot.toDate();
        if (slot instanceof Date) return slot;
        if (typeof slot === 'string') return new Date(slot);
        return null;
    };

    // Statistics Calculation
    const stats = useMemo(() => {
        const now = new Date();
        const todayStr = now.toLocaleDateString();

        const todayCount = appointments.filter(apt => {
            const aptDate = getDate(apt.scheduledSlot) || getDate(apt._sortTime) || new Date();
            return aptDate.toLocaleDateString() === todayStr;
        }).length;

        const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
        const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length;
        const rate = appointments.length ? Math.round((confirmedCount / appointments.length) * 100) : 0;

        return [
            { label: "Today's Volume", value: todayCount, icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Pending Requests", value: pendingCount, icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/10" },
            { label: "Total Bookings", value: appointments.length, icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" },
            { label: "Efficiency Rate", value: `${rate}%`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" }
        ];
    }, [appointments]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await appointmentService.updateAppointmentStatus(id, status);
            toast.success(`Appointment ${status} successfully`);
            fetchAppointments();
        } catch (error) {
            console.error(`AdminPage: Error updating status to ${status}:`, error);
            toast.error(`Failed to ${status} appointment`);
        }
    };

    const filteredAppointments = useMemo(() => {
        return appointments.filter(apt => {
            const matchesSearch = (
                apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [appointments, searchTerm, statusFilter]);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'confirmed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]';
            case 'cancelled': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            default: return 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]';
        }
    };

    return (
        <div className="w-full min-h-[100dvh] bg-bg-body pt-8 pb-20 px-4 md:px-6 selection:bg-accent/30">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-white/40 hover:text-accent mb-4 transition-all group"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit Admin</span>
                        </button>
                        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-none">
                            Management <span className="text-white/30 italic font-light">Suite</span>
                        </h1>
                        <p className="text-white/40 mt-4 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Clinical Overview
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <GlassSurface className="p-2 px-6 rounded-full flex items-center gap-4 border-white/5 bg-white/[0.02]" blur="sm">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-serif text-xl font-bold shadow-xl shadow-accent/20 shrink-0">
                                {appointments.length}
                            </div>
                            <div className="text-left flex flex-col justify-center whitespace-nowrap min-w-[100px]">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-0.5">Database</p>
                                <p className="text-sm font-bold text-white leading-none">Records Active</p>
                            </div>
                        </GlassSurface>
                    </motion.div>
                </div>

                {/* Statistics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <GlassSurface className="p-6 md:p-8 rounded-[2rem] border-white/5 bg-white/[0.01] group hover:bg-white/[0.03] transition-all">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-inner`}>
                                    <stat.icon size={24} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif text-white mb-1 font-medium">{stat.value}</h3>
                                <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/30">{stat.label}</p>
                            </GlassSurface>
                        </motion.div>
                    ))}
                </div>

                {/* Command Center (Sticky) */}
                <div className="sticky top-4 z-40 py-2 -mx-4 px-4 md:px-0">
                    <GlassSurface className="p-4 md:p-5 rounded-[2.5rem] border-white/10 bg-bg-body/40 backdrop-blur-3xl shadow-2xl flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 border-t border-l" intensity="high">
                        <div className="relative w-full lg:max-w-md group order-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search patients or treatments..."
                                className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/[0.03] border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 p-1.5 bg-white/[0.02] rounded-3xl border border-white/5 w-full lg:w-auto overflow-x-auto no-scrollbar order-2 lg:order-2 mt-4 lg:mt-0">
                            {['all', 'pending', 'confirmed', 'cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap
                                        ${statusFilter === status
                                            ? 'bg-white text-blue-950 shadow-xl'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                >
                                    {status === 'all' ? 'Every Queue' : status}
                                </button>
                            ))}
                            <PurgeButton onPurge={async () => {
                                await appointmentService.deleteAllAppointments();
                                toast.success("Database Purged");
                                fetchAppointments();
                            }} />
                        </div>
                    </GlassSurface>
                </div>

                {/* Appointments List */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <Skeleton count={3} className="h-40 rounded-[2.5rem]" />
                            </motion.div>
                        ) : filteredAppointments.length > 0 ? (
                            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6">
                                {filteredAppointments.map((apt, index) => (
                                    <motion.div
                                        key={apt.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <GlassSurface
                                            variant="card"
                                            className="p-8 md:p-10 flex flex-col xl:flex-row justify-between gap-10 group hover:border-white/20 transition-all duration-500 overflow-hidden relative"
                                            blur="lg"
                                        >
                                            {/* Glow Accent */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[100px] pointer-events-none group-hover:bg-accent/10 transition-all" />

                                            <div className="flex-1 flex flex-col lg:flex-row gap-10">
                                                {/* Visual Date Indicator */}
                                                <div className="flex lg:flex-col items-center lg:items-center justify-center lg:justify-start gap-3 lg:gap-1 shrink-0 lg:w-28 lg:border-r border-white/5 lg:pr-10 lg:text-center">
                                                    <div className="text-3xl md:text-4xl font-serif text-white leading-none">
                                                        {apt.scheduledSlot?.toDate?.().toLocaleDateString('en-GB', { day: '2-digit' }) || '??'}
                                                    </div>
                                                    <div className="text-[11px] uppercase font-bold tracking-[0.2em] text-accent">
                                                        {apt.scheduledSlot?.toDate?.().toLocaleDateString('en-GB', { month: 'short' }) || '---'}
                                                    </div>
                                                    <div className="hidden lg:block w-8 h-1 bg-accent/20 rounded-full my-4" />
                                                    <div className="text-xs font-bold text-white/40 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                                                        <Clock size={12} className="text-accent" />
                                                        {apt.scheduledSlot?.toDate?.().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) || '--:--'}
                                                    </div>
                                                </div>

                                                {/* Interaction Details */}
                                                <div className="flex-1 space-y-6 text-center lg:text-left">
                                                    <div className="space-y-3">
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 justify-center lg:justify-start">
                                                            <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight font-medium">
                                                                {apt.patientName}
                                                            </h3>
                                                            <span className={`self-center lg:self-auto text-[9px] px-4 py-1.5 rounded-full border font-bold uppercase tracking-widest ${getStatusStyles(apt.status)} transition-all shadow-inner`}>
                                                                {apt.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-1">
                                                            <span className="flex items-center gap-2.5 text-xs font-medium text-white/50 bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                                                                <Activity size={14} className="text-accent" /> {apt.service}
                                                            </span>
                                                            <a href={`tel:${apt.patientPhone}`} className="flex items-center gap-2.5 text-xs font-medium text-white/50 hover:text-white transition-colors bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                                                                <Phone size={14} className="text-accent" /> {apt.patientPhone}
                                                            </a>
                                                            <a href={`mailto:${apt.patientEmail}`} className="flex items-center gap-2.5 text-xs font-medium text-white/50 hover:text-white transition-colors bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                                                                <Mail size={14} className="text-accent" /> {apt.patientEmail}
                                                            </a>
                                                            {(apt.patientDob || (apt.notes && apt.notes.match(/\[DOB: (.*?)\]/))) && (
                                                                <span className="flex items-center gap-2.5 text-xs font-medium text-white/50 bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                                                                    <User size={14} className="text-accent" /> Born: {apt.patientDob || apt.notes.match(/\[DOB: (.*?)\]/)[1]}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {apt.notes && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block lg:block w-full">
                                                            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 border-dashed text-sm text-white/50 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-left relative group/note">
                                                                <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 block">— Patient Requirements</span>
                                                                "{apt.notes.replace(/\[DOB: .*?\]/, '').trim() || 'No additional notes'}"
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Suite (Mobile Optimized) */}
                                            <div className="flex flex-row xl:flex-col items-center justify-center xl:justify-start gap-4 shrink-0 pt-6 xl:pt-0 border-t xl:border-t-0 xl:border-l border-white/5 xl:pl-10">
                                                {apt.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                                                            className="flex-1 xl:w-full py-5 px-8 rounded-3xl bg-accent text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all shadow-2xl shadow-accent/10 active:scale-95 group/btn"
                                                        >
                                                            <CheckCircle size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                                                            className="flex-1 xl:w-full py-5 px-8 rounded-3xl bg-white/[0.03] border border-white/10 text-white/30 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500 transition-all active:scale-95 group/btn"
                                                        >
                                                            <XCircle size={18} className="group-hover/btn:rotate-90 transition-transform" />
                                                            Decline
                                                        </button>
                                                    </>
                                                )}
                                                {apt.status !== 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(apt.id, 'pending')}
                                                        className="w-full py-5 px-8 rounded-3xl bg-white/[0.03] border border-white/5 text-white/20 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white hover:bg-white/[0.05] transition-all active:scale-95"
                                                    >
                                                        <Activity size={14} /> Restore
                                                    </button>
                                                )}
                                            </div>
                                        </GlassSurface>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
                                <GlassSurface className="w-24 h-24 rounded-full flex items-center justify-center text-white/10 mb-8 border border-white/10" intensity="low">
                                    <Search size={48} />
                                </GlassSurface>
                                <h2 className="text-3xl font-serif text-white mb-2">No Records Found</h2>
                                <p className="text-white/30 max-w-xs font-medium text-sm">We couldn't find any appointments matching your current criteria.</p>
                                {(searchTerm || statusFilter !== 'all') && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                                        className="mt-8 px-8 py-3 rounded-full border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5"
                                    >
                                        Reset Command Center
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default AdminPage;
