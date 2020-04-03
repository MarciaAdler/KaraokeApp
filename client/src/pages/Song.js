import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";
import Navigation from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";

function Song() {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Song;
