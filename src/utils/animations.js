export const routeIndices = {
    '/': 0,
    '/studio': 0.1,
    '/services': 0.2,
    '/login': 0.3,
    '/settings': 0.4,
    '/visit': 1,
    '/hotline': 2,
    '/book': 3
};

export const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 1,
        position: 'absolute'
    }),
    center: {
        x: 0,
        opacity: 1,
        zIndex: 1,
        position: 'relative'
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        zIndex: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    })
};
