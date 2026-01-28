import { config } from 'dotenv';
import initSupabase from '../supabaseClient.js';

config({
    path: '.env', // Явно указываем путь
    debug: process.env.DEBUG // Для отладки (опционально)
});

const supabase = initSupabase();

class User {
    static async register(userData) {
        // Логика регистрации пользователя
        return await supabase.auth.signUp({
            email: userData.email,
            password: userData.password
        });
    }

    static async login(credentials) {
        return await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        });
    }

    static async getUserById(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        return data;
    }
}

export default User;