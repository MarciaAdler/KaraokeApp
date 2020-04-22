import React from "react";
import SignupForm from "../components/SignupForm";
import { Container, Row, Col } from "react-bootstrap";

export default function Signup() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <img className="my-3 w-100" src={require("../img/logo.png")} alt="SingAlong Karaoke" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-md-6">
            <SignupForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
