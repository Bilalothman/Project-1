import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { MenuContext } from '../context/MenuContext';

function Admin() {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: 'appetizers', description: '', image: '' });
  const [editing, setEditing] = useState(null);  // For edit mode
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useContext(MenuContext);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios.get('http://localhost:3000/api/menu').then(res => setMenu(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Login first');
    const token = localStorage.getItem('token');
    try {
      if (editing) {
        await axios.put(`http://localhost:3000/api/menu/${editing}`, form, { headers: { Authorization: token } });
        setMessage('Item updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/menu', form, { headers: { Authorization: token } });
        setMessage('Item added successfully!');
      }
      setForm({ name: '', price: '', category: 'appetizers', description: '', image: '' });
      setEditing(null);
      setShowModal(false);
      fetchMenu();
    } catch (err) {
      setMessage('Error saving item');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/menu/${id}`, { headers: { Authorization: token } });
      setMessage('Item deleted successfully!');
      fetchMenu();
    } catch (err) {
      setMessage('Error deleting item');
    }
  };

  if (!user) return <Container className="py-5"><h2>Please login to access Admin.</h2></Container>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Admin - Manage Menu</h2>
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Button variant="primary" onClick={() => { setForm({ name: '', price: '', category: 'appetizers', description: '', image: '' }); setEditing(null); setShowModal(true); }}>Add New Item</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit Item' : 'Add Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Button variant="primary" type="submit">{editing ? 'Update' : 'Add'} Item</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Admin;