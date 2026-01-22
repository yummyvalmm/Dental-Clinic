import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Moon, Globe, Bell, Shield, Info, ChevronRight, Monitor } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassSurface from '../components/ui/GlassSurface';

import { useTheme } from '../context/ThemeContext';

const SystemSettingsPage = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        const themes = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const settingSections = [
        {
            title: 'Appearance',
            items: [
                {
                    label: 'Theme',
                    value: theme.charAt(0).toUpperCase() + theme.slice(1),
                    icon: Moon,
                    type: 'action',
                    onClick: handleThemeChange
                },
                {
                    label: 'Language',
                    value: 'English',
                    icon: Globe,
                    type: 'select'
                }
            ]
        },
        {
            title: 'Notifications',
            items: [
                {
                    label: 'Push Notifications',
                    value: 'On',
                    icon: Bell,
                    type: 'toggle'
                },
                {
                    label: 'Email Updates',
                    value: 'Off',
                    icon: Bell,
                    type: 'toggle'
                }
            ]
        },
        {
            title: 'Privacy & Security',
            items: [
                {
                    label: 'Blocked Users',
                    icon: Shield,
                    type: 'link'
                },
                {
                    label: 'Data Usage',
                    icon: Monitor,
                    type: 'link'
                }
            ]
        },
        {
            title: 'About',
            items: [
                {
                    label: 'Version',
                    value: '1.0.0 (2026.1)',
                    icon: Info,
                    type: 'info'
                },
                {
                    label: 'Terms of Service',
                    icon: Shield,
                    type: 'link'
                }
            ]
        }
    ];

    return (
        <div className="min-h-[100dvh] w-full bg-bg-body relative flex flex-col pt-24 pb-32 px-6 overflow-hidden">

            {/* Ambient Background */}
            {/* Ambient Background - Dynamic Liquid Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/30 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-normal animate-float-delayed" />
            <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-teal-300/20 dark:bg-transparent rounded-full blur-[80px] pointer-events-none mix-blend-multiply dark:mix-blend-normal" />

            <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-2"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-[var(--glass-bg-medium)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--glass-bg-high)] transition-colors shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold text-[var(--color-text-main)]">System Settings</h1>
                    <div className="w-10" /> {/* Spacer for centering */}
                </motion.div>

                {/* Settings Lists */}
                <div className="flex flex-col gap-6">
                    {settingSections.map((section, sectionIndex) => (
                        <motion.div
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                        >
                            <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] pl-4 font-bold mb-3">{section.title}</h3>
                            <div className="flex flex-col gap-3">
                                {section.items.map((item, itemIndex) => (
                                    <GlassSurface
                                        key={itemIndex}
                                        className={`p-4 rounded-[2rem] ${item.type === 'action' ? 'cursor-pointer' : ''}`}
                                        intensity="low"
                                        onClick={item.onClick}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="w-10 h-10 rounded-full bg-[var(--glass-bg-low)] flex items-center justify-center text-[var(--color-text-muted)] shrink-0">
                                                    <item.icon size={18} />
                                                </div>
                                                <span className="text-[var(--color-text-main)] font-medium">{item.label}</span>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                {item.value && (
                                                    <span className="text-[var(--color-text-muted)] text-sm">{item.value}</span>
                                                )}
                                                {(item.type === 'link' || item.type === 'select') && (
                                                    <ChevronRight size={18} className="text-[var(--color-text-muted)]/50" />
                                                )}
                                            </div>
                                        </div>
                                    </GlassSurface>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SystemSettingsPage;
