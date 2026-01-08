const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

const tasksPath = path.join(__dirname, 'tasks.json');

async function initializeTasksFile() {
    try {
        await fs.access(tasksPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(tasksPath, '[]');
            console.log('Файл tasks.json создан');
        }
    }
}

app.get('/api/tasks', async (req, res) => {
    try {
        const data = await fs.readFile(tasksPath, 'utf8');
        const tasks = JSON.parse(data);

        if (!Array.isArray(tasks)) {
            return res.status(500).json({ error: 'Неверный формат данных в tasks.json' });
        }

        res.json(tasks);
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
        res.status(500).json({
            error: 'Ошибка при получении задач',
            details: error.message
        });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = req.body;

        if (!newTask.id || !newTask.title) {
            return res.status(400).json({
                error: 'Для создания задачи требуются поля: id, title'
            });
        }

        const tasks = JSON.parse(await fs.readFile(tasksPath, 'utf8'));
        tasks.push(newTask);

        await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Ошибка при сохранении задачи:', error);
        res.status(500).json({ error: 'Ошибка при сохранении задачи' });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedData = req.body;

        const tasks = JSON.parse(await fs.readFile(tasksPath, 'utf8'));
        const taskIndex = tasks.findIndex(task => String(task.id) === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Задача не найдена' });
        }

        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
        await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

        res.json(tasks[taskIndex]);
    } catch (error) {
        console.error('Ошибка обновления задачи:', error);
        res.status(500).json({ error: 'Ошибка сохранения изменений' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const tasks = JSON.parse(await fs.readFile(tasksPath, 'utf8'));


        const filteredTasks = tasks.filter(task => String(task.id) !== taskId);
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Задача не найдена' });
        }

        await fs.writeFile(tasksPath, JSON.stringify(filteredTasks, null, 2));
        res.status(204).send();
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        res.status(500).json({ error: 'Ошибка при удалении задачи' });
    }
});

app.use((err, req, res, next) => {
    console.error('Необработанная ошибка:', err.stack);
    res.status(500).send('Произошла ошибка на сервере');
});

async function startServer() {
    try {
        await initializeTasksFile();
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
        process.exit(1);
    }
}

startServer();