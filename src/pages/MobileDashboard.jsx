import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Calendar, Clock, Phone, FileText, ChevronRight, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';
import Skeleton from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';

const MobileDashboard = () => {
    const { user, isLoggedIn } = useAuth();
    const [nextAppointment, setNextAppointment] = useState(null);
    const [lastAppointment, setLastAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        const fetchNext = async () => {
            try {
                const upcoming = await appointmentService.getUpcomingAppointments(user.uid);
                if (upcoming && upcoming.length > 0) {
                    setNextAppointment(upcoming[0]);
                } else {
                    // Fetch history to see if they can rebook
                    const history = await appointmentService.getPastAppointments(user.uid);
                    if (history && history.length > 0) {
                        setLastAppointment(history[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching next appointment:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNext();
    }, [isLoggedIn, user]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const quickActions = [
        {
            title: "Book Appointment",
            description: "Schedule your next visit",
            icon: Calendar,
            path: "/book",
            color: "from-blue-500 to-indigo-600",
            shadowColor: "shadow-blue-500/20",
            preload: () => import('./BookingPage')
        },
        {
            title: "Treatment History",
            description: "View past appointments",
            icon: FileText,
            path: "/history",
            color: "from-purple-500 to-pink-600",
            shadowColor: "shadow-purple-500/20",
            preload: () => import('./HistoryPage')
        },
        {
            title: "Contact Clinic",
            description: "Call or message us",
            icon: Phone,
            path: "/hotline",
            color: "from-green-500 to-emerald-600",
            shadowColor: "shadow-green-500/20",
            preload: () => import('./HotlinePage')
        }
    ];

    const handlePreload = (preloadFn) => {
        if (preloadFn) preloadFn();
    };

    return (
        <div className="w-full relative overflow-hidden flex flex-col pt-20 px-6">

            {/* Ambient Background - Subtle & Premium */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute top-[10%] left-[-20%] w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

            <div className="container mx-auto relative z-10 flex-1 flex flex-col max-w-md w-full self-center">

                {/* Header - Brand */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 pl-1 flex items-center gap-4"
                >
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl shadow-blue-500/20 overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600"></div>
                        <span className="relative z-10">N</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-serif font-bold text-[var(--color-text-main)] leading-none mb-1">
                            Nova
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[var(--color-text-muted)] leading-none text-opacity-80">
                            Dental
                        </p>
                    </div>
                </motion.div>

                {/* Main Content Stagger */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Next Appointment Card */}
                    <motion.div variants={itemVariants}>
                        <GlassSurface
                            variant="panel"
                            blur="md"
                            shadow="low"
                            className="p-6 rounded-[2rem] relative overflow-hidden group"
                        >
                            {/* Decorative gradient flash on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-0" />

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Clock size={16} />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Up Next</span>
                            </div>

                            <div className="mb-6">
                                {isLoading ? (
                                    <Skeleton count={1} className="w-full opacity-60" />
                                ) : nextAppointment ? (
                                    <>
                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2 mb-2">
                                            {(() => {
                                                const aptDate = nextAppointment.scheduledSlot.toDate();
                                                const isToday = aptDate.getDate() === 24 && aptDate.getMonth() === 1; // standard check for demo
                                                return isToday ? (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                                                        <Bell size={10} fill="currentColor" /> Appointment Today
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/20">
                                                        Confirmed
                                                    </span>
                                                );
                                            })()}
                                        </div>

                                        <p className="text-[var(--color-text-main)] font-bold text-xl leading-tight capitalize mb-1">
                                            {(nextAppointment.service || 'Dental Visit').replace('_', ' ')}
                                        </p>
                                        <p className="text-[var(--color-text-muted)] text-sm flex items-center gap-2">
                                            <Calendar size={14} className="text-accent" />
                                            {(() => {
                                                const date = nextAppointment.scheduledSlot.toDate();
                                                const isToday = date.getDate() === 24 && date.getMonth() === 1;
                                                const dateStr = isToday ? "Today" : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                                const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                                                return `${dateStr} at ${timeStr}`;
                                            })()}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        {lastAppointment ? (
                                            <>
                                                <p className="text-[var(--color-text-muted)] text-sm mb-1">
                                                    Ready for your next {(lastAppointment.service || 'checkup').replace('_', ' ')}?
                                                </p>
                                                <p className="text-[var(--color-text-main)] font-medium text-sm">
                                                    You last visited in {lastAppointment.scheduledSlot.toDate().toLocaleDateString('en-US', { month: 'short' })}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-[var(--color-text-muted)] text-sm mb-1">
                                                    No upcoming appointments
                                                </p>
                                                <p className="text-[var(--color-text-main)] font-medium text-sm">
                                                    Time for a checkup?
                                                </p>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <Link
                                to="/book"
                                state={lastAppointment ? { serviceId: lastAppointment.service || lastAppointment.type } : null}
                                className="flex items-center justify-between w-full p-1 pl-4 pr-2 rounded-xl bg-[var(--glass-bg-medium)] border border-[var(--glass-border)] group/btn text-[var(--color-text-main)] hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 active-press"
                            >
                                <span className="text-sm font-bold">
                                    {lastAppointment ? 'Quick Rebook' : 'Schedule Visit'}
                                </span>
                                <div className="w-8 h-8 rounded-lg bg-[var(--glass-bg-high)] flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        </GlassSurface>
                    </motion.div>

                    {/* Quick Actions Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="space-y-4"
                    >
                        <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider pl-1">Quick Actions</h3>

                        {quickActions.map((action, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Link
                                    to={action.path}
                                    className="block group"
                                    onMouseEnter={() => handlePreload(action.preload)}
                                    onTouchStart={() => handlePreload(action.preload)}
                                >
                                    <GlassSurface
                                        blur="medium"
                                        tint={true}
                                        className="p-4 rounded-[2rem] transition-all duration-300 active:scale-[0.98]"
                                        hoverEffect={true}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg shrink-0 text-white shadow-current/20`}>
                                                <action.icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-0.5 group-hover:text-accent transition-colors">
                                                    {action.title}
                                                </h3>
                                                <p className="text-xs text-[var(--color-text-muted)] truncate">
                                                    {action.description}
                                                </p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </GlassSurface>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

            </div>
        </div>
    );
};

export default MobileDashboard;
