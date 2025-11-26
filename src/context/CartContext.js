import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("ros_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ros_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) {
        return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { ...item, qty }];
    });
  };

  const increaseQty = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
