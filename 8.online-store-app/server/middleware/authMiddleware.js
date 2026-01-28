import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({
    path: '.env', // Явно указываем путь
    debug: process.env.DEBUG // Для отладки (опционально)
});

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};