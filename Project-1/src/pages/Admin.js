import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';

function Admin() {
  const [form, setForm] = useState({ name: '', price: '', category: 'appetizers', description: '', image: '' });
  const [message, setMessage] = useState('');
  const { user } = useContext(MenuContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Login first');
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/api/menu', form, { headers: { Authorization: token } });
      setMessage('Item added successfully!');
      setForm({ name: '', price: '', category: 'appetizers', description: '', image: '' });
    } catch (err) {
      setMessage('Error adding item');
    }
  };

  if (!user) return <Container className="py-5"><h2>Please login to access Admin.</h2></Container>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Admin - Add Menu Item</h2>
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" step="0.01" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="appetizers">Appetizers</option>
                <option value="mains">Mains</option>
                <option value="desserts">Desserts</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="url" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Item</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;