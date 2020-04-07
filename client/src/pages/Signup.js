import React from "react";
import SignupForm from "../components/SignupForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Signup() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
