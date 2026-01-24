import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import WhiteningPromo from '../components/sections/WhiteningPromo';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

import SEO from '../components/common/SEO';

const HomePage = () => {
    return (
        <div className="min-h-[100dvh] w-full pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-0 overflow-x-hidden">
            <Navbar />
            <SEO
                title="Premium Cosmetic Dentistry"
                description="Transform your smile with London's leading cosmetic dentists. Specialized in porcelain veneers, composite bonding, and invisalign."
                canonical="/"
            />
            <div id="hero"><Hero /></div>
            <div id="about"><About /></div>
            <div id="services"><Services /></div>
            <WhiteningPromo />
            <Team />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default HomePage;
