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

class CartItem {
    static async addToCart(data) {
        return await supabase
            .from('cart_items')
            .insert(data);
    }

    static async getUserCart(userId) {
        return await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId);
    }

    static async updateQuantity(id, quantity) {
        return await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', id);
    }

    static async removeFromCart(id) {
        return await supabase
            .from('cart_items')
            .delete()
            .eq('id', id);
    }
}

export default CartItem;