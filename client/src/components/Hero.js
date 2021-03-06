import React from "react";
import { Jumbotron, Container, Col, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { useStoreContext } from "../utils/GlobalState";
export default function Hero() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Jumbotron fluid className="home--hero justify-content-center">
        <Container className="home--container">
          <Row>
            <Col className="col-12 col-md-6">
              <h1>SingAlong Karaoke</h1>
              {state.currentUser.id === 0 ? (
                <p>
                  Search and save your favorite songs!
                </p>
              ) : (
                <p>Welcome {state.currentUser.username}!</p>
              )}
            </Col>
            {state.currentUser.id === 0 ? (
              <Col className="col-12 col-md-6 login-form mx-auto">
                <LoginForm />
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
}
