import React from "react";
import ArtistSongs from "./ArtistSongs";
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

  function checkIfSaved(saved) {
    for (let i = 0; i < saved.length;i++) {
      if (saved[i].songId === state.currentSong.id) {
        return <span><i class="fas fa-check"></i>&nbsp;Saved</span>
      } 
    }
    return <span><i class="fas fa-star"></i>&nbsp;Save</span>
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
      <Media className="current-song--media">
        <img
          width={200}
          height={200}
          className="mr-5"
          src={props.artwork}
          alt={state.currentSong.title}
        />
        <Media.Body>
          <h4>{state.currentSong.title}</h4>
          <h5>{state.currentSong.artist}</h5>
          Released: {state.currentSong.year}
          <br />
          Genres: {state.currentSong.styles.replace(/,/g, ", ")}
          <br />
          {state.currentSong.explicit === 0 ? (
            ""
          ) : (
            <img
              className="current-song--detail"
              alt="explicit"
              src={require("../img/explicit.png")}
            />
          )}{" "}
          {state.currentSong.duo === 0 ? (
            ""
          ) : (
            <img
              className="current-song--detail"
              alt="duet"
              src={require("../img/duet-icon.png")}
            />
          )}
          <br />
          {state.currentUser.id === 0 ? "" : 
            <button
            className="btn current-song--saved-btn"
            onClick={() => {
              saveSong();
            }}
          >
              {/* <i class="fas fa-star"></i>&nbsp;Save */}
              {checkIfSaved(state.saved)}
            </button>
          }

          
          
        </Media.Body>
      </Media>

      <ArtistSongs />
    </Col>
  );
}
