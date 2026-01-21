import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import GlassSurface from '../components/ui/GlassSurface';

const HistoryPage = () => {
    // Mock data - replace with real API call
    const appointments = [
        {
            id: 1,
            date: "Jan 15, 2026",
            time: "10:00 AM",
            treatment: "Routine Checkup",
            dentist: "Dr. Sarah Johnson",
            status: "completed"
        },
        {
            id: 2,
            date: "Dec 10, 2025",
            time: "2:30 PM",
            treatment: "Teeth Cleaning",
            dentist: "Dr. Sarah Johnson",
            status: "completed"
        }
    ];

    return (
        <div className="w-full min-h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-24 pb-32 overscroll-none">

            <div className="container mx-auto px-6 relative z-10 flex-1 max-w-md">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-serif text-white leading-tight mb-2">
                        Treatment History
                    </h1>
                    <p className="text-white/60 text-sm">
                        Your past appointments
                    </p>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                    {appointments.length > 0 ? (
                        appointments.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassSurface className="p-5 rounded-3xl" intensity="medium">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <CheckCircle className="text-green-500" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{apt.treatment}</h3>
                                                <p className="text-white/60 text-sm">{apt.dentist}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/60 pl-13">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span>{apt.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>{apt.time}</span>
                                        </div>
                                    </div>
                                </GlassSurface>
                            </motion.div>
                        ))
                    ) : (
                        <GlassSurface className="p-8 rounded-3xl text-center" intensity="low">
                            <p className="text-white/40">No appointment history</p>
                        </GlassSurface>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HistoryPage;
