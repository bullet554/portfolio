import { useState } from "react";
import './ChuckNorrisAPI.css';

export const ChuckNorrisAPI = () => {
    const [joke, setJoke] = useState('');
    const [isLoading, setIsLoading] = useState();

    const url = 'https://api.chucknorris.io/jokes/random';

    const getJoke = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка сети или сервера');
            const data = await response.json();
            setJoke(data.value);
        } catch (error) {
            console.error('Ошибка при получении шутки', error);
            setJoke('Не удалось загрузить шутку. Попробуйте ещё раз.');
        }
        setIsLoading(false);
    }

    return (
        <div className="app">
            <h1 className="title">Шутки о Чаке Норрисе</h1>

            <div className="joke-container">
                {isLoading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Загрузка шутки...</p>
                    </div>
                ) : (
                    <p className="joke">{joke || 'Нажмите кнопку, чтобы получить шутку!'}</p>
                )}
            </div>

            <button
                onClick={getJoke}
                disabled={isLoading}
                className="fetch-button"
            >
                {isLoading ? 'Загружается...' : 'Получить новую шутку'}
            </button>
        </div>
    );
}