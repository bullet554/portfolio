import { Router } from 'express';
import initSupabase from '../supabaseClient.js';

const router = Router();

router.get('/', async (req, res) => {
    const supabase = initSupabase();
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'Требуется userId' });
    }

    try {
        const { data, error } = await supabase
            .from('cart')
            .select(`
                id,
                product_id,
                quantity,
                products (id, name, price, img, color, size)
                `)
            .eq('user_id', userId);

        if (error) {
            return res.status(500).json({ error: 'Ошибка загрузки корзины' });
        }

        const cart_items = {
            items: data.map(item => ({
                id: item.id,
                productId: item.product_id,
                quantity: item.quantity,
                price: item.products.price,
                name: item.products.name,
                img: item.products.img,
                color: item.products.color,
                size: item.products.size
            })),
            total: data.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
        };

        res.json(cart_items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add', async (req, res) => {
    console.log('ADD TO CART body:', req.body);
    const supabase = initSupabase();
    const { userId, productId, quantity, color, size } = req.body;

    if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: 'Недостаточно данных', got: req.body });
    }

    try {
        const { data, error: insertError } = await supabase
            .from('cart')
            .insert([{
                user_id: userId,
                product_id: productId,
                quantity,
                color,
                size,
            }])
            .select();

        if (insertError) {
            console.error('SUPABASE insertError:', insertError);
            return res.status(500).json({
                error: insertError.message,
                details: insertError, // временно, чтобы увидеть код/детали
            });
        }

        return res.json({ message: 'Товар добавлен в корзину', data });
    } catch (err) {
        console.error('SERVER exception:', error);
        return res.status(500).json({ error: error.message || 'Internal error' });
    }
});

router.put('/update/:id', async (req, res) => {
    const supabase = initSupabase();
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    try {
        const { error } = await supabase
            .from('cart')
            .update({ quantity })
            .eq('id', cartItemId);

        if (error) {
            return res.status(500).json({ error: 'Ошибка обновления количества' });
        }

        res.json({ message: 'Количество обновлено' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
    const supabase = initSupabase();
    const cartItemId = req.params.id;

    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('id', cartItemId);

        if (error) {
            return res.status(500).json({ error: 'Ошибка удаления товара' });
        }

        res.json({ message: 'Товар удалён из корзины' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/clear', async (req, res) => {
    const supabase = initSupabase();
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'Требуется userId' });
    }

    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId);

        if (error) {
            return res.status(500).json({ error: 'Ошибка очистки корзины' });
        }

        return res.json({ message: 'Корзина очищена' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


export default router;