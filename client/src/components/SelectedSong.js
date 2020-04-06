import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";

export default function SelectedSong(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div>
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
            props.saveSong(props);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
