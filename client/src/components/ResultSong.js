import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG, SET_SONG_RESULTS } from "../utils/actions";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

export default function ResultSong(props) {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setResults(window.location.search);
  }, []);
  function selectSong(result) {
    const song = {
      id: result.id,
      title: result.title,
      artist: result.artist,
      year: result.year,
      duo: result.duo,
      explicit: result.explicit,
      styles: result.styles,
    };

    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: song,
    });
    setRedirect(true);

    console.log(state.currentSong);
  }
  const renderRedirect = () => {
    if (state.currentSong && redirect) {
      return (
        // <Redirect push to={`/song/${state.currentSong.title}-${state.currentSong.artist}`}
        // />
        <Redirect
          push
          to={{
            pathname: "/song",
            search: `?title=${state.currentSong.title}&&artist=${state.currentSong.artist}`,
          }}
        />
      );
    }
  };
  function setResults(url) {
    console.log(url);
    if (state.results.length === 0 && window.location.search) {
      API.getSongs(url.replace("?q=", ""))
        .then((response) => {
          dispatch({
            type: SET_SONG_RESULTS,
            results: response.data,
          });
          console.log(response);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      {state.results.length
        ? state.results.map((result) => (
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
