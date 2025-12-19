import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterContext } from "../contexts/FilterContext";
import withFilter from "../hoc/withFilter";
import { toggleTodo } from "../actions/todoActions";

const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const { filter } = useContext(FilterContext);

    const filteredTodos = withFilter(todos, filter);

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    }

    return (
        <ul>
            {filteredTodos.map(todo => (
                <li
                    key={todo.id}
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{ textDecoration: todo.completed ? 'Line-through' : 'none' }}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;