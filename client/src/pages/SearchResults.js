import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";

export default function SearchResults(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      {state.results.length
        ? state.results.map(result => (
            <ResultSong
              key={result.id}
              id={result.id}
              title={result.title}
              artist={result.artist}
              year={result.year}
              duo={result.duo}
              explicit={result.explicit}
              styles={result.styles}
            />
          ))
        : "no songs"}
    </div>
  );
}
