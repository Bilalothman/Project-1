import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </MenuProvider>
  );
}