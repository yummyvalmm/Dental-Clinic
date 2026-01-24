import { User, Shield, Globe, LifeBuoy } from 'lucide-react';

export const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Studio', href: '/studio' },
    { name: 'Menu', href: '/services' },
];

export const desktopNavLinks = [
    { name: 'Home', path: '/', hash: '#hero' },
    { name: 'The Studio', path: '/studio', hash: '#about' },
    { name: 'Treatments', path: '/services', hash: '#services' },
];

export const mobileMenuItems = [
    { label: 'Login / Sign Up', path: '/login', icon: User },
    { label: 'My Insurance', path: '#', icon: Shield },
    { label: 'Language', path: '#', icon: Globe, value: 'EN' },
    { label: 'Help & Support', path: '/hotline', icon: LifeBuoy }
];
