import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    return(
        <Container fluid className="footer--container py-2 text-center">
            <Row>
                <Col>
                    <img src={require("../img/logo-white.png")} alt="SingAlong Karaoke" className="footer--logo" />
                </Col>
                <Col>
                    <a href="/about">
                        About
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;