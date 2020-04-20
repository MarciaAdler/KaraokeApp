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
            <Col>
              <h1>SingAlong Karaoke</h1>
              {state.currentUser.id === 0 ? (
                <p>
                  This is a modified jumbotron that occupies the entire
                  horizontal space of its parent.
                </p>
              ) : (
                <p>Welcome {state.currentUser.username}!</p>
              )}
            </Col>
            {state.currentUser.id === 0 ? (
              <Col className="login-form mx-auto">
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
