import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

const MobileDashboard = () => {
    const quickActions = [
        {
            title: "Book Appointment",
            description: "Schedule your next visit",
            icon: Calendar,
            path: "/book",
            color: "from-blue-500 to-indigo-600",
            shadowColor: "shadow-blue-500/20"
        },
        {
            title: "Treatment History",
            description: "View past appointments",
            icon: FileText,
            path: "/history",
            color: "from-purple-500 to-pink-600",
            shadowColor: "shadow-purple-500/20"
        },
        {
            title: "Contact Clinic",
            description: "Call or message us",
            icon: Phone,
            path: "/hotline",
            color: "from-green-500 to-emerald-600",
            shadowColor: "shadow-green-500/20"
        }
    ];

    return (
        <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-24 pb-[100px] overscroll-none">

            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center max-w-md">

                {/* Header */}
                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-[var(--color-text-main)] leading-tight mb-2"
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[var(--color-text-muted)] text-sm"
                    >
                        Manage your dental care
                    </motion.p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <Link to={action.path}>
                                <GlassSurface
                                    blur="medium"
                                    tint={true}
                                    className="p-4 rounded-[2rem]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg shrink-0`}>
                                            <action.icon className="text-white" size={20} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-1 group-hover:translate-x-1 transition-transform">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-[var(--color-text-muted)]">
                                                {action.description}
                                            </p>
                                        </div>
                                        <ChevronRight size={20} className="text-[var(--color-text-muted)] shrink-0" />
                                    </div>
                                </GlassSurface>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Next Appointment Card (if exists) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <GlassSurface
                        variant="panel"
                        blur="md"
                        shadow="low"
                        className="p-5 rounded-[2rem]"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="text-accent" size={18} />
                            <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)]">Next Appointment</span>
                        </div>
                        <p className="text-[var(--color-text-muted)] text-sm">
                            No upcoming appointments
                        </p>
                        <Link to="/book" className="text-accent text-sm font-semibold mt-2 inline-block hover:underline">
                            Schedule now →
                        </Link>
                    </GlassSurface>
                </motion.div>

            </div>
        </div>
    );
};

export default MobileDashboard;
