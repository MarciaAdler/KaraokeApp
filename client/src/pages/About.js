import React from "react";
import { Col, Row, Container } from "react-bootstrap";

export default function About() {
  return (
    <Container className="about py-3">
      <Row>
        <Col className="text-center">
          <img className="logo w-100" src={require("../img/logo.png")} alt="SingAlong Karaoke" />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="about--container col-auto px-3 py-3">
          <p>
            SingAlong Karaoke was developed by{" "}
            <a
              href="https://www.linkedin.com/in/francis-moran-63970665/"
              target="_blank"
            >
              Francis Moran
            </a>{" "}
            and{" "}
            <a href="https://www.linkedin.com/in/marciaadler/" target="_blank">
              Marcia Adler
            </a>
            .{" "}
          </p>

          <p>
            Technologies used: React, Express, MySQL, Sequelize, Javascript,
            Bootstrap, Sass
          </p>

          <p>APIs used: Youtube API, Genius API, Musixmatch API</p>

          <p>
            Credits: Duet icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
              target="_blank"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              target="_blank"
            >
              {" "}
              www.flaticon.com
            </a>
          </p>

          <p>
            Database songs from{" "}
            <a
              href="https://www.karafun.com/karaoke-song-list.html"
              target="_blank"
            >
              Karafun song list
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
