import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../actions/todoActions";

const initialState = [];

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: Date.now(), text: action.payload.text, completed: false }];
        case TOGGLE_TODO:
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        case DELETE_TODO:
            const commentId = action.payload.id;
            return state.filter(todo => todo.id !== commentId);

        /* state.map(todo =>
            todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ); */
        default:
            return state;
    }
}

export default todosReducer;