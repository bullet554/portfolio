export const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products');
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
    }
};