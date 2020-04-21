import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import topsongs from "../top-songs.json";

function HomeTopSaved() {

    console.log(topsongs);

    function renderTopSongs(topsongs) {
        return topsongs.map(song => {
            return <Col sm={6}
            md={3}
            key={song.id}
            className="my-3 px-4">
                 <a href={song.link} className="result-song--atag">
                <div
                className="result-song--container px-3 py-3"
                style={{ backgroundImage: `url(${song.image})` }}
              >
                    <div className="result-song--container__essentials text-center my-auto mx-auto h-100">
                  <p className="result-song--title mb-2">{song.title}</p>
                  <p className="result-song--artist">{song.artist}</p>

                </div>

                <div className="result-song--container__background">&nbsp;</div>
                  </div>
                  </a>
                </Col>
                
        });
        
    }

    return(
        <Container fluid className="mt-5">
            <Row>
                <Col>
                    <h4 className="home--saved-title">
                        Top Karaoke Songs
                    </h4>
                </Col>
            </Row>
            <Row>
                {renderTopSongs(topsongs)}
            </Row>
        </Container>
    )
}

export default HomeTopSaved;