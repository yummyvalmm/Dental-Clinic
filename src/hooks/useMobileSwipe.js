import { useDrag } from 'react-use-gesture';
import { useNavigate, useLocation } from 'react-router-dom';

export const useMobileSwipe = (isMobileView) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Define the sequence of pages for swipe navigation
    const swipeOrder = ['/', '/book', '/history', '/profile'];

    const bind = useDrag(({ swipe: [swipeX] }) => {
        if (!isMobileView) return;

        const currentIndex = swipeOrder.indexOf(location.pathname);
        if (currentIndex === -1) return;

        // Swipe Left (Go Forward/Right in logic)
        if (swipeX === -1 && currentIndex < swipeOrder.length - 1) {
            navigate(swipeOrder[currentIndex + 1]);
        }
        // Swipe Right (Go Backward/Left in logic)
        else if (swipeX === 1 && currentIndex > 0) {
            navigate(swipeOrder[currentIndex - 1]);
        }
    }, {
        axis: 'x',
        filterTaps: true,
    });

    return bind;
};
