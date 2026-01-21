import { motion } from 'framer-motion';
import { Phone, ArrowRight, Clock, Globe, ShieldAlert } from 'lucide-react';

const HotlinePage = () => {
    const contacts = [
        {
            title: "General Enquiries",
            number: "+44 (0) 20 7123 4567",
            desc: "Mon - Fri, 09:00 - 18:00",
            icon: Clock,
            isHighlight: false
        },
        {
            title: "Emergency Care",
            number: "+44 (0) 7700 900077",
            desc: "24/7 Urgent Assistance",
            icon: ShieldAlert,
            isHighlight: true
        },
        {
            title: "International",
            number: "+44 (0) 20 7123 4568",
            desc: "Overseas Patient Concierge",
            icon: Globe,
            isHighlight: false
        }
    ];

    return (
        <div className="w-full h-[100dvh] bg-bg-body relative overflow-hidden flex flex-col pt-24 pb-24 lg:pt-32 overscroll-none touch-none">

            {/* Ambient Background */}
            {/* Ambient Background Removed for uniform dark blue */}

            <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center max-w-md lg:max-w-4xl">

                <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent block mb-4">Direct Lines</span>
                    <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight">
                        We are here <br />
                        <span className="text-white/40">to help you.</span>
                    </h1>
                </div>

                <div className="space-y-4">
                    {contacts.map((item, index) => (
                        <motion.a
                            key={index}
                            href={`tel:${item.number}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative flex items-center justify-between p-5 rounded-[2rem] transition-all duration-300 active:scale-[0.98] glass-liquid-dark
                                ${item.isHighlight ? 'shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)] border-red-500/30' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-inner
                                    ${item.isHighlight
                                        ? 'bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                                        : 'bg-white/5 text-accent group-hover:bg-accent group-hover:text-white'}`}
                                >
                                    <item.icon size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-sm mt-1 uppercase tracking-wider font-medium text-white/40 group-hover:text-white/70 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 border border-white/5
                                ${item.isHighlight ? 'bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white' : 'bg-white/5 text-white/30 group-hover:bg-white group-hover:text-primary'}`}>
                                <ArrowRight size={18} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-12 text-center lg:text-left">
                    <p className="text-white/30 text-xs uppercase tracking-widest">
                        Tap any card to call directly
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HotlinePage;
