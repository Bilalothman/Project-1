import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuContext } from '../context/MenuContext';
import { CartContext } from '../context/CartContext';

function NavBar() {
  const { user, setUser } = useContext(MenuContext);
  const { cart, setCart } = useContext(CartContext);  // Added 'cart' here

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart([]);  // Clears the cart on logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <LinkContainer to="/">
        <Navbar.Brand>Gourmet Bites</Navbar.Brand>
      </LinkContainer>
      <Nav className="ml-auto">
        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to="/menu"><Nav.Link>Menu</Nav.Link></LinkContainer>
        <LinkContainer to="/account"><Nav.Link>Account</Nav.Link></LinkContainer>
        <LinkContainer to="/cart"><Nav.Link>Cart ({cart.length})</Nav.Link></LinkContainer>  // 'cart' is now defined
        <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
        {user && <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>}
        {user && <Nav.Link onClick={logout}>Logout</Nav.Link>}
      </Nav>
    </Navbar>
  );
}

export default NavBar;