import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
import SavedSong from "../components/SavedSong";
export default function Saved(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <SavedSong />
    </div>
  );
}
