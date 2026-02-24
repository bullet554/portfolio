import { useDispatch } from 'react-redux';
import { switchTheme } from '../slices/themeSlice';
import { Button } from 'react-bootstrap';

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const handleSwitch = () => {
        dispatch(switchTheme());
    };

    return (
        <Button
            variant="primary"
            className="button-theme"
            onClick={handleSwitch}
        >
            Переключить тему
        </Button>
    );
}

export default ThemeSwitcher;