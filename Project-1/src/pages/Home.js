import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container fluid className="hero-bg text-white py-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="display-4 fade-in">Welcome to Gourmet Bites</h1>
          <p className="lead">Delicious food, delivered fresh.</p>
          <Card className="mt-4 shadow-lg border-0">
            <Card.Body className="bg-light text-dark">
              <Card.Title>Featured: Grilled Salmon</Card.Title>
              <Card.Text>$25.99 - Fresh and flavorful!</Card.Text>
              <Link to="/menu"><Button variant="primary">View Menu</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;