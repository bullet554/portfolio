import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './slices/todoSlice';
import { ThemeContext } from './contexts/ThemeContext';
import { FilterProvider } from './contexts/FilterContext';
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';
import ThemeSwitcher from './component/ThemeSwitcher';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

function App() {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const status = useSelector(state => state.todos.status);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Загрузка задач...</div>;
  }

  return (
    <div className={`app ${theme} container mt-4`}>
      <div className='app__title'>
        <h2>Список задач:</h2>
        <ThemeSwitcher />
      </div>

      <FilterProvider>
        <AddTodo />
        <TodoFilter />
        <TodoList />
      </FilterProvider>
    </div>
  );
}

export default App;