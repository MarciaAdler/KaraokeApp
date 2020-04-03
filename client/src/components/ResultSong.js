import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";

export default function ResultSong(props) {
  const [state, dispatch] = useStoreContext();

  function selectSong(result) {
    const song = {
      id: result.id,
      title: result.title,
      artist: result.artist,
      year: result.year,
      styles: result.styles
    };

    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: song
    });
    console.log(state.currentSong);
  }

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
    </div>
  );
}
