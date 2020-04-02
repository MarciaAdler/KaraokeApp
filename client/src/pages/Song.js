import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING } from "../utils/actions";
import API from "../utils/API";
import Navigation from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";

function Song() {


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <p>Song</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Song;