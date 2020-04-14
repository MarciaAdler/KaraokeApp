import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";

export default function SearchResults(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <Container fluid>
        <ResultSong />
    </Container>
  );
}
