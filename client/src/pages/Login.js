import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Login() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
