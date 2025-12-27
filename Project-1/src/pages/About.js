import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Card className="shadow-lg border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-center">About Us</Card.Title>
              <Card.Text>We serve the finest cuisine with passion. Our chefs use fresh ingredients to create memorable meals. Contact us at info@gourmetbites.com.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;