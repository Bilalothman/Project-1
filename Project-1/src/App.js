import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Cart from './pages/Cart';
import About from './pages/About';
import Admin from './pages/Admin';  // Added import

function App() {
  return (
    <CartProvider>
      <MenuProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />  // Added route
          </Routes>
        </Router>
      </MenuProvider>
    </CartProvider>
  );
}

export default App;