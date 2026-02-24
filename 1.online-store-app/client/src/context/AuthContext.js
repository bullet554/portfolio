import { createContext, useContext, useState } from 'react';
import { authApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async ({ email, password }) => {
        const res = await authApi.login({ email, password });
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        setUser(user);

        return user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);