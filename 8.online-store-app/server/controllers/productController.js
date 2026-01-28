import supabase from '../supabaseClient.js';

export const getProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) return res.status(500).json({ error: error.message });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};