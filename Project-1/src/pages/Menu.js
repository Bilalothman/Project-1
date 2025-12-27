import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function Menu() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:3000/api/menu').then(res => setMenu(res.data));
  }, []);

  const categories = ['appetizers', 'mains', 'desserts'];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Our Menu</h2>
      <Tabs defaultActiveKey="appetizers" className="mb-3">
        {categories.map(cat => (
          <Tab eventKey={cat} title={cat.charAt(0).toUpperCase() + cat.slice(1)} key={cat}>
            <Row>
              {menu.filter(item => item.category === cat).map(item => (
                <Col md={4} key={item.id} className="mb-4">
                  <Card className="shadow-sm hover-card">
                    <Card.Img variant="top" src={item.image} alt={item.name} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text className="text-primary font-weight-bold">${item.price}</Card.Text>
                      <Button variant="success" onClick={() => addToCart(item)}>Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
}

export default Menu;