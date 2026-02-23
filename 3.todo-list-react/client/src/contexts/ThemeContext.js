import { createContext } from 'react';
import { useSelector } from 'react-redux';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = useSelector(state => state.theme.currentTheme);
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
