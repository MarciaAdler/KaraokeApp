import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS } from "../utils/actions";
import ResultSong from "../components/ResultSong";

export default function SearchResults(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <ResultSong />
    </div>
  );
}
