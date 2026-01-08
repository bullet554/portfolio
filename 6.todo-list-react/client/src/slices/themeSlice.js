import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
    currentTheme: 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        switchTheme: (state) => {
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        }
    }
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;