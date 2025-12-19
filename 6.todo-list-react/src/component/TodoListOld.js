import { useState, useEffect } from "react";
import {
    Form,
    Button,
    ListGroup,
    InputGroup
} from 'react-bootstrap';

function TodoListOld() {
    const TASKS_KEY = 'todoListTasks';

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem(TASKS_KEY);
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                if (Array.isArray(parsedTasks)) {
                    return parsedTasks;
                }
            } catch (error) {
                console.error('Ошибка при парсинге данных:', error);
            }
        }
        return [];
    });

    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) {
            alert('Пустое поле нельзя добавить!');
            return;
        }
        setTasks(prevTasks => [
            ...prevTasks,
            { id: Date.now(), text: newTask }
        ]);
        setNewTask('');
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return (
        <div className="container mt-4">
            <h2>Список задач:</h2>

            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Введите задачу..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button variant="primary" onClick={addTask}>
                    Добавить
                </Button>
            </InputGroup>

            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item
                        key={task.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        {task.text}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                        >
                            <i className="fa fa-trash"></i> Удалить
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default TodoListOld;
