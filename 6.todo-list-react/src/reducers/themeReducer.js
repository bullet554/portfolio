import { SWITCH_THEME } from "../actions/themeActions";

const initialState = {
    currentTheme: 'light'
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_THEME:
            return {
                currentTheme: state.currentTheme  === 'light' ? 'dark' : 'light'
            };

        default:
            return state;
    }
};

export default themeReducer;