import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
import Form from 'react-bootstrap/Form';

const TodoFilter = () => {
    const { filter, setFilter } = useContext(FilterContext);

    const handleChange = (e) => {
        setFilter(e.target.value);
    }

    return (
        <Form.Select
            aria-label="Default select example"
            value={filter} onChange={handleChange}
        >
            <option value="all">Все</option>
            <option value="completed">Выполненные</option>
            <option value="active">Активные</option>
        </Form.Select>
    );
}

export default TodoFilter;