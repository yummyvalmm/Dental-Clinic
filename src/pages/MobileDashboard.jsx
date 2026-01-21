import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, FileText } from 'lucide-react';
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
        <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-24 pb-32 overscroll-none">

            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center max-w-md">

                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white leading-tight mb-2"
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-sm"
                    >
                        Manage your dental care
                    </motion.p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <Link to={action.path}>
                                <GlassSurface
                                    className={`group p-6 rounded-3xl transition-all duration-300 active:scale-[0.98] hover:shadow-2xl ${action.shadowColor}`}
                                    intensity="medium"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg shrink-0`}>
                                            <action.icon className="text-white" size={24} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-white/60">
                                                {action.description}
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <span className="text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all">→</span>
                                        </div>
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
                    <GlassSurface className="p-5 rounded-3xl border border-white/10" intensity="low">
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="text-accent" size={18} />
                            <span className="text-xs uppercase tracking-wider font-bold text-white/60">Next Appointment</span>
                        </div>
                        <p className="text-white/40 text-sm">
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
