import { FilterProvider } from './contexts/FilterContext';
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import TodoFilter from './component/TodoFilter';
import TodoListOld from './component/TodoListOld';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <FilterProvider>
        <AddTodo />
        <TodoList />
        <TodoFilter />
      </FilterProvider>

      <TodoListOld />
    </>
  );
}

export default App;
