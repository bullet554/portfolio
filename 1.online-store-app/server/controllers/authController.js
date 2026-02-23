import supabase from '../supabaseClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password: hash }]);

        if (error) return res.status(500).json({ error: error.message });

        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};