import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>  // Added setCart here
      {children}
    </CartContext.Provider>
  );
};