import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { cartApi } from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const res = await cartApi.getCart(user.id);
      setCart(res.data.items || []);
    } catch (e) {
      setCart([]);
    }
  };

  const addToCart = async (product, quantity = 1, color = null, size = null) => {
    if (!user) return;

    await cartApi.addToCart({
      userId: user.id,
      productId: product.id,
      quantity,
      color,
      size,
    });

    await loadCart();
  };

  const removeFromCart = async (cartItemId) => {
    if (!user) return;
    await cartApi.removeFromCart(cartItemId);
    await loadCart();
  };

  const clearCart = async () => {
    if (!user) return;
    await cartApi.clearCart(user.id);
    await loadCart();
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (!user) return;
    await cartApi.updateCartItem(cartItemId, quantity);
    await loadCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);