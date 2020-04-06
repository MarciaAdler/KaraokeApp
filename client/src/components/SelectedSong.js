import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";

export default function SelectedSong(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
      <div key={state.currentSong.id}>
        Title: {state.currentSong.title}
        <br />
        Artist: {state.currentSong.artist}
        <br />
        Year: {state.currentSong.year}
        <br />
        Explicit: {state.currentSong.explicit === 0 ? "false" : "true"}
        <br />
        Duo: {state.currentSong.duo === 0 ? "false" : "true"}
        <br />
        Styles: {state.currentSong.styles}
        <br />
        <button
          onClick={() => {
            state.currentSong.saveSong(props);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
