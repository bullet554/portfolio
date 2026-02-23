import supabase from '../supabaseClient.js';

export const getCart = async (req, res) => {
    try {
        const userId = req.userId;

        const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId);

        if (error) return res.status(500).json({ error: error.message });

        res.json(data || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const newItem = req.body;

        const { data, error } = await supabase
            .from('cart')
            .insert([{ ...newItem, user_id: userId }]);

        if (error) return res.status(500).json({ error: error.message });

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.params.itemId;

        const { error } = await supabase
            .from('cart')
            .delete()
            .match({ id: itemId, user_id: userId });

        if (error) return res.status(500).json({ error: error.message });

        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};