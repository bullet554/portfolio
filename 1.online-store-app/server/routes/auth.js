import { Router } from 'express';
import initSupabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
    const supabase = initSupabase();
    const { email, password, firstName, lastName, gender } = req.body;

    try {
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const { data: newUser } = await supabase
            .from('users')
            .insert([
                {
                    email,
                    password: hashedPassword,
                    first_name: firstName, // Используем корректное имя поля
                    last_name: lastName,
                    gender,
                }
            ])
            .select();

        res.status(201).json({
            message: 'Успешно зарегистрирован',
            user: { id: newUser.id, email, firstName, lastName }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    console.log('Login request received:', req.body); // Отладка
    const supabase = initSupabase();
    const { email, password } = req.body;

    try {
        const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { userId: user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Успешный вход',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;