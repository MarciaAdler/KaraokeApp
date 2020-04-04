import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";
import Navigation from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import SelectedSong from "../components/SelectedSong";

function Song(props) {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    loadSong();
  });
  function loadSong() {
    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: state.currentSong
    });
  }
  return (
    <div>
      <Container fluid>
        <SelectedSong
          selectSong={state.currentSong.selectSong}
          key={state.currentSong.id}
          id={state.currentSong.id}
          title={state.currentSong.title}
          artist={state.currentSong.artist}
          year={state.currentSong.year}
          duo={state.currentSong.duo}
          explicit={state.currentSong.explicit}
          styles={state.currentSong.styles}
        />
      </Container>
    </div>
  );
}

export default Song;
