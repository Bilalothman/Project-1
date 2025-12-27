import React, { useContext } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { MenuContext } from '../context/MenuContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(MenuContext);
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);  // Parse price as float

  const checkout = async () => {
    if (!user) return alert('Login first');
    const token = localStorage.getItem('token');
    const items = cart.map(item => ({ menuItemId: item.id, quantity: 1 }));
    await axios.post('http://localhost:3000/api/order', { userId: user.id, items }, { headers: { Authorization: token } });
    alert('Order placed!');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center">Your Cart</h2>
      <ListGroup>
        {cart.map(item => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between">
            {item.name} - ${parseFloat(item.price).toFixed(2)} <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button> 
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4>Total: ${total.toFixed(2)}</h4>
      <Button variant="success" onClick={checkout}>Checkout</Button>
    </Container>
  );
}

export default Cart;