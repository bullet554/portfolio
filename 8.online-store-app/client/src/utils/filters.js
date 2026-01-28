export const filterProducts = (products, selectedSize) => {
    if (!selectedSize) return products;
    return products.filter(product => product.size === selectedSize);
};

export const sortProducts = (products, sortType) => {
    switch (sortType) {
        case 'price-asc':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-desc':
            return [...products].sort((b, a) => a.price - b.price);
        default:
            return products;
    }
};