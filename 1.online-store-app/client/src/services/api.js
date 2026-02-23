import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const authApi = {
    register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),
    login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
};

export const productApi = {
    getProducts: () => axios.get(`${API_BASE_URL}/products`),
};

export const cartApi = {
    getCart: (userId) => axios.get(`${API_BASE_URL}/cart`, { params: { userId } }),
    addToCart: (item) => axios.post(`${API_BASE_URL}/cart/add`, item),
    removeFromCart: (cartItemId) => axios.delete(`${API_BASE_URL}/cart/remove/${cartItemId}`),
    updateCartItem: (cartItemId, quantity) =>
        axios.put(`${API_BASE_URL}/cart/update/${cartItemId}`, { quantity }),
    clearCart: (userId) => axios.delete(`${API_BASE_URL}/cart/clear`, { params: { userId } }),
};