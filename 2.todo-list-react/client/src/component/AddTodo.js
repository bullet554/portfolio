import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slices/todoSlice";
import { Form, Button, InputGroup } from 'react-bootstrap';

const AddTodo = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleAddTodo = async () => {
        try {
            await dispatch(addTask({ text }));
            setText('');
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Введите задачу..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTodo();
                    }
                }}
                />
                <Button variant="primary" onClick={handleAddTodo}>Добавить</Button>
            </InputGroup>
        </div>
    );
}

export default AddTodo;