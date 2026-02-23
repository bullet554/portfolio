import { Router } from 'express';
import initSupabase from '../supabaseClient.js';

const router = Router();

router.get('/', async (req, res) => {
    const supabase = initSupabase();
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            return res.status(500).json({ error: 'Ошибка загрузки товаров' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const supabase = initSupabase();
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PNR') {
                return res.status(404).json({ error: 'Товар не найден' });
            }
            return res.status(500).json({ error: 'Ошибка сервера' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;