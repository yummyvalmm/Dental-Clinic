import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';

const StudioPage = () => {
    return (
        <div className="pt-24 pb-24 lg:pt-32 lg:pb-0">
            <About />
            <Team />
            <Testimonials />
        </div>
    );
};

export default StudioPage;
