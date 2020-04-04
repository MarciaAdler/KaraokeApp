import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
export default function SearchResults(props) {
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStoreContext();
  //   const [redirect, setRedirect] = useState(false);
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
    if (state.results && redirect) {
      return <Redirect to="/song" />;
    }
  };
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
              selectSong={selectSong}
            />
          ))
        : "no songs"}
      {renderRedirect()}
    </div>
  );
}
