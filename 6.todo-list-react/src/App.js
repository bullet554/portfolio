import { FilterProvider } from './contexts/FilterContext';
import { useSelector } from 'react-redux';
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';
import ThemeSwitcher from './component/ThemeSwitcher';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

function App() {
  const theme = useSelector(state => state.theme.currentTheme);

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
