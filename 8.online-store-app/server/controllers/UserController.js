import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Константы
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    // Валидация входящих данных
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        // Создание пользователя
        const { user, error } = await User.register({
            email: req.body.email,
            password: hashedPassword
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Генерация токена
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    // Валидация входящих данных
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user, error } = await User.login({
            email: req.body.email,
            password: req.body.password
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        // Проверка пароля
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Генерация токена
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};