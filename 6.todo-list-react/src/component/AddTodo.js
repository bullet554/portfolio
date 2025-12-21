import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { Form, Button, InputGroup } from 'react-bootstrap';

const AddTodo = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        dispatch(addTodo(text));
        setText('');
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Введите задачу..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button variant="primary" onClick={handleAddTodo}>Добавить</Button>
            </InputGroup>
        </div>
    );
}

export default AddTodo;