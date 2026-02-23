const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const USERS_FILE = path.join(__dirname, 'usersData.json');

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf8');
}

function readUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла пользователей:', error);
        return [];
    }
}

function writeUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка записи файла пользователей:', error);
    }
}

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Имя пользователя и пароль обязательны'
        });
    }

    try {
        const users = readUsers();

        if (users.some(user => user.username === username)) {
            return res.status(409).json({
                success: false,
                message: 'Пользователь с таким именем уже существует'
            });
        }

        const newUser = {
            id: Date.now(),
            username,
            password, // В реальной системе используйте хеширование!
            balance: 0
        };

        users.push(newUser);
        writeUsers(users);

        res.json({
            success: true,
            message: 'Регистрация успешна',
            user: { id: newUser.id, username: newUser.username, balance: newUser.balance }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера при регистрации'
        });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Имя пользователя и пароль обязательны'
        });
    }

    try {
        const users = readUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Неверное имя пользователя или пароль'
            });
        }

        res.json({
            success: true,
            message: 'Вход выполнен',
            user: { id: user.id, username: user.username, balance: user.balance }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера при входе'
        });
    }
});

app.get('/balance/:username', (req, res) => {
    const username = req.params.username;

    try {
        const users = readUsers();
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден'
            });
        }

        res.json({
            success: true,
            balance: user.balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении баланса'
        });
    }
});

app.put('/update-balance', (req, res) => {
    const { username, amount } = req.body;

    try {
        const users = readUsers();
        const userIndex = users.findIndex(u => u.username === username);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Пользователь не найден'
            });
        }

        users[userIndex].balance += amount;
        writeUsers(users);

        res.json({
            success: true,
            message: 'Баланс обновлён',
            newBalance: users[userIndex].balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при обновлении баланса'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});