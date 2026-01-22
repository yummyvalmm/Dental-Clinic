import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};

export const LayoutProvider = ({ children }) => {
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);

    return (
        <LayoutContext.Provider value={{ isNavbarHidden, setIsNavbarHidden }}>
            {children}
        </LayoutContext.Provider>
    );
};
