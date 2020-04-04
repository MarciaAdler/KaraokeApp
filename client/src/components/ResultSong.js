import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";

export default function ResultSong(props) {
  const [state, dispatch] = useStoreContext();

  //   function selectSong(result) {
  //     const song = {
  //       id: result.id,
  //       title: result.title,
  //       artist: result.artist,
  //       year: result.year,
  //       duo: result.duo,
  //       explicit: result.explicit,
  //       styles: result.styles
  //     };

  //     dispatch({
  //       type: SET_CURRENT_SONG,
  //       currentSong: song
  //     });
  //     console.log(state.currentSong);
  //   }

  return (
    <div>
      {/* {state.results.length
        ? state.results.map(result => ( */}
      <div key={props.id}>
        Title: {props.title}
        <br />
        Artist: {props.artist}
        <br />
        Year: {props.year}
        <br />
        Explicit: {props.explicit === 0 ? "false" : "true"}
        <br />
        Duo: {props.duo === 0 ? "false" : "true"}
        <br />
        Styles: {props.styles}
        <br />
        <button
          onClick={() => {
            props.selectSong(props);
          }}
        >
          Select
        </button>
      </div>
      {/* )) : "no songs"} */}
    </div>
  );
}
