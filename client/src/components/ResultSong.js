import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG } from "../utils/actions";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

export default function ResultSong(props) {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  function selectSong(result) {
    const song = {
      id: result.id,
      title: result.title,
      artist: result.artist,
      year: result.year,
      duo: result.duo,
      explicit: result.explicit,
      styles: result.styles
    };

    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: song
    });
    setRedirect(true);

    console.log(state.currentSong);
  }
  const renderRedirect = () => {
    if (state.currentSong && redirect) {
      return (
        <Redirect
          to={`/song/${state.currentSong.title}-${state.currentSong.artist}`}
        />
      );
    }
  };
  return (
    <div>
      {state.results.length
        ? state.results.map(result => (
            <div key={result.id}>
              Title: {result.title}
              <br />
              Artist: {result.artist}
              <br />
              Year: {result.year}
              <br />
              Explicit: {result.explicit === 0 ? "false" : "true"}
              <br />
              Duo: {result.duo === 0 ? "false" : "true"}
              <br />
              Styles: {result.styles}
              <br />
              <button
                onClick={() => {
                  selectSong(result);
                }}
              >
                Select
              </button>
            </div>
          ))
        : "no songs"}
      {renderRedirect()}
    </div>
  );
}
