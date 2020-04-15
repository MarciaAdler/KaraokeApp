import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
import Navigation from "../components/Nav";
import { SET_SONG_RESULTS } from "../utils/actions";
export default function SearchResults(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <Navigation />
      <Container fluid>
        <ResultSong />
      </Container>
    </div>
  );
}
