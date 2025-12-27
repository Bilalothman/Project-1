import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </CartProvider>
  </React.StrictMode>
);