import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterContext } from "../contexts/FilterContext";
import withFilter from "../hoc/withFilter";
import { deleteTodo, toggleTodo } from "../actions/todoActions";
import { Button, ListGroup } from 'react-bootstrap';

const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const { filter } = useContext(FilterContext);

    const filteredTodos = withFilter(todos, filter);

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    }

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    }

    return (
        <ListGroup>
            {filteredTodos.map(todo => (
                <ListGroup.Item
                    key={todo.id}
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{ textDecoration: todo.completed ? 'Line-through' : 'none' }}
                    className="d-flex justify-content-between align-items-center"
                >
                    {todo.text}
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTodo(todo.id);
                        }}
                    >
                        <i className="fa fa-trash"></i> Удалить
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default TodoList;