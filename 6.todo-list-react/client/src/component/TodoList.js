import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilterContext } from '../contexts/FilterContext';
import { ThemeContext } from '../contexts/ThemeContext';
import withFilter from '../hoc/withFilter';
import { deleteTask, updateTask } from '../slices/todoSlice';
import { Button, ListGroup } from 'react-bootstrap';

const TodoList = () => {
    const theme = useContext(ThemeContext);
    const tasks = useSelector(state => state.todos.tasks);
    const { filter } = useContext(FilterContext);
    const dispatch = useDispatch();
    const filteredTasks = withFilter(tasks, filter);

    const handleToggleTodo = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        dispatch(updateTask({
            id: taskId,
            completed: !task.completed
        }));
    };

    const handleDeleteTodo = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <ListGroup className={theme}>
            {filteredTasks.map(task => (
                <ListGroup.Item
                    key={task.id}
                    onClick={() => handleToggleTodo(task.id)}
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        cursor: 'pointer'
                    }}
                    className="d-flex justify-content-between align-items-center"
                >
                    {task.title}
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTodo(task.id);
                        }}
                    >
                        <i className="fa fa-trash"></i> Удалить
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TodoList;