const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});


app.use(express.static('public'));

app.use(express.json());

app.put('/data.json', async (req, res) => {
    try {
        console.log('Полученные данные:', req.body);

        const data = req.body;

        const filePath = path.join(__dirname, 'public', 'data.json');
        console.log('Путь к файлу:', filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Файл не найден' });
        }

        await fs.promises.writeFile(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.status(200).json({ message: 'Данные сохранены' });
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ error: 'Ошибка сохранения' });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});