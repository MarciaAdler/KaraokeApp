import React from "react";
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Col,
  Row,
  Container,
  Media,
} from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG, SET_SAVED_SONGS } from "../utils/actions";
import API from "../utils/API";

export default function SelectedSong(props) {
  const [state, dispatch] = useStoreContext();
  function saveSong() {
    API.saveSong({
      userId: state.currentUser.id,
      songId: state.currentSong.id,
    })
      .then((results) => {
        console.log(results.data);
        updateSaved(state.currentUser.id);
      })
      .catch((err) => console.log(err));
  }

  function updateSaved(userId) {
    API.getSaved(userId)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: SET_SAVED_SONGS,
          saved: response.data,
        });
        window.localStorage.setItem(
          "savedSongs",
          JSON.stringify(response.data)
        );
      })
      .catch((err) => console.log(err));
  }
  return (
    <Col md={6} key={state.currentSong.id}>
      <Media>
        <img
          width={200}
          height={200}
          className="mr-5"
          src={props.artwork}
          alt={state.currentSong.title}
        />
        <Media.Body>
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
              saveSong();
            }}
          >
            Save
          </button>
        </Media.Body>
      </Media>
    </Col>
  );
}
