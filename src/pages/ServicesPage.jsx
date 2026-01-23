import Services from '../components/sections/Services';
import WhiteningPromo from '../components/sections/WhiteningPromo';

import SEO from '../components/common/SEO';

const ServicesPage = () => {
    return (
        <div className="pt-32 pb-24 lg:pt-32 lg:pb-0">
            <SEO
                title="Treatments & Pricing"
                description="Explore our full range of dental services including Veneers, Whitening, Implants and Orthodontics. Transparent pricing and payment plans available."
                canonical="/services"
            />
            <Services />
            <WhiteningPromo />
        </div>
    );
};

export default ServicesPage;
