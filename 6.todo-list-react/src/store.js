import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosReducer";
import themeReducer from "./reducers/themeReducer";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        theme: themeReducer
    }
});

export default store;