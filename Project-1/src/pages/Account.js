import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';

function Account() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [orders, setOrders] = useState([]);
  const { user, setUser } = useContext(MenuContext);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/${type}`, form);
      if (type === 'login') {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        fetchOrders(res.data.user.id);
      }
      setShowLogin(false); setShowRegister(false);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const fetchOrders = (userId) => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/api/orders/${userId}`, { headers: { Authorization: token } })
      .then(res => setOrders(res.data));
  };

  useEffect(() => {
    if (user) fetchOrders(user.id);
  }, [user]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
        <h2 className="text-center">Account</h2>
        {!user ? (
          <>
            <Button variant="outline-primary" onClick={() => setShowLogin(true)}>Login</Button>
            <Button variant="primary" className="ml-2" onClick={() => setShowRegister(true)}>Register</Button>
          </>
        ) : (
          <>
            <Alert variant="success">Welcome, {user.username}!</Alert>
            <h4>Order History</h4>
            <ListGroup>
              {orders.map(order => (
                <ListGroup.Item key={order.id}>{order.name} - Qty: {order.quantity} - ${order.total_price}</ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
    </Row>
    <Modal show={showLogin} onHide={() => setShowLogin(false)}>
      <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, 'login')}>
          <Form.Group><Form.Control type="email" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} /></Form.Group>
          <Form.Group><Form.Control type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} /></Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
    <Modal show={showRegister} onHide={() => setShowRegister(false)}>
      <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, 'register')}>
          <Form.Group><Form.Control type="text" placeholder="Username" onChange={(e) => setForm({...form, username: e.target.value})} /></Form.Group>
          <Form.Group><Form.Control type="email" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} /></Form.Group>
          <Form.Group><Form.Control type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} /></Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Modal.Body>
    </Modal>
  </Container>
);
}

export default Account;