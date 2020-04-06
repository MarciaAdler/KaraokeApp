import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";
import Navigation from "../components/Nav";
import { Container, Row, Col } from "react-bootstrap";
import SelectedSong from "../components/SelectedSong";
import Video from "../components/Video";
import Lyrics from "../components/Lyrics";

function Song(props) {
  const [state, dispatch] = useStoreContext();
  const [video, setVideo] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [artwork, setArtwork] = useState("");

  useEffect(() => {
    loadSong();
  }, []);
  function getVideo(currentSong) {
    API.getVideo(currentSong)
      .then(res => {
        const id = res.data.items[0].id.videoId;

        setVideo(id);
      })
      .catch(err => console.log(err));
  }
  function getLyrics(currentSong) {
    API.getLyrics(currentSong)
      .then(res => {
        console.log(res.data);
        const lines = res.data.split("\n");
        setLyrics(lines);
      })
      .catch(err => console.log(err));
  }
  function getImage(currentSong) {
    API.getImage(currentSong)
      .then(res => {
        setArtwork(res.data);
      })
      .catch(err => console.log(err));
  }
  function loadSong() {
    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: state.currentSong
    });
    getVideo(state.currentSong);
    getLyrics(state.currentSong);
    getImage(state.currentSong);
  }
  return (
    <div>
      <Container fluid>
        <Video video={video} />
        <SelectedSong
          artwork={artwork}
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
        <Lyrics lyrics={lyrics} />
      </Container>
    </div>
  );
}

export default Song;
