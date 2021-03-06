import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
import { SET_SONG_RESULTS } from "../utils/actions";
export default function SearchResults(props) {
  const [state, dispatch] = useStoreContext();

  const searchVal = window.location.search
    .replace("?q=", "")
    .replace(/%20/g, " ")
    .replace(/%27/g, "'");
  console.log(searchVal);
  return (
    <div>
      <Container fluid className="pt-4">
        {state.loading ? (
          <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
          </div>
        ) : (
          <div>
            <h2>
              Showing {state.results.length} results for "{searchVal}".
            </h2>{" "}
            <ResultSong />
          </div>
        )}
      </Container>
    </div>
  );
}
