import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({
    path: '.env', // Явно указываем путь
    debug: process.env.DEBUG // Для отладки (опционально)
});

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

class Product {
    static async getAll() {
        const { data, error } = await supabase
            .from('products')
            .select('*');
        return data;
    }

    static async getById(id) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
        return data;
    }

    static async create(data) {
        const { data, error } = await supabase
            .from('products')
            .insert(data);
        return data;
    }
}

export default Product;