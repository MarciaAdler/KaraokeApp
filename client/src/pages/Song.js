import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, SET_CURRENT_SONG } from "../utils/actions";
import API from "../utils/API";
import { Container, Row, Col } from "react-bootstrap";
import SelectedSong from "../components/SelectedSong";
import Video from "../components/Video";
import Lyrics from "../components/Lyrics";

function Song(props) {
  const [state, dispatch] = useStoreContext();
  const [video, setVideo] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [artwork, setArtwork] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    loadSong(window.location.search);
  }, []);

  function getVideo(currentSong) {
    API.getVideo(currentSong)
      .then((res) => {
        const id = res.data.items[0].id.videoId;

        setVideo(id);
      })
      .catch((err) => console.log(err));
  }

  function getLyrics(currentSong) {
    API.getLyrics(currentSong)
      .then((res) => {
        const lines = res.data
          .replace("******* This Lyrics is NOT for Commercial use *******", "")
          .split("\n");
        lines.splice(lines.length - 1);
        setLyrics(lines);
      })
      .catch((err) => console.log(err));
  }

  function getImage(currentSong) {
    API.getImage(currentSong)
      .then((res) => {
        setArtwork(res.data.song_art_image_thumbnail_url);

        setPath(res.data.path);
      })
      .catch((err) => console.log(err));
  }

  function loadSong(url) {
    console.log("From loadSong function: ");
    console.log(url);

    if (state.currentSong.artist === "") {
      API.getSongFromURL(url.replace("?", ""))
        .then((res) => {
          const song = {
            id: res.data.id,
            title: res.data.title,
            artist: res.data.artist,
            year: res.data.year,
            duo: res.data.duo,
            explicit: res.data.explicit,
            styles: res.data.styles,
          };

          dispatch({
            type: SET_CURRENT_SONG,
            currentSong: song,
          });

          getVideo(song);
          getLyrics(song);
          getImage(song);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_CURRENT_SONG,
        currentSong: state.currentSong,
      });

      getVideo(state.currentSong);
      getLyrics(state.currentSong);
      getImage(state.currentSong);
    }
  }

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-center py-3 video--container">
          <Col className="col-12">
            <Video video={video} />
          </Col>
        </Row>
        <Row className="py-5">
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
          <Col md={6}>
            <h4>Lyrics</h4>
            <Lyrics lyrics={lyrics} path={path} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Song;
