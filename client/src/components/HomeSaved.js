import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { Redirect, Link } from "react-router-dom";
import { SET_CURRENT_SONG, SET_SONG_RESULTS, LOADING } from "../utils/actions";
import API from "../utils/API";
export default function HomeSaved() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [songDetail, setSongDetail] = useState([]);
  const [localSaved, setLocalSaved] = useState(state.saved);

  function start() {
    for (let i = 0; i < 4; i++) {
      console.log(state.saved);
      const song = state.saved[i];
      getSongs(song);
    }
  }

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
  async function getSongs(saved) {
    const { data } = await API.findSaved(saved.songId);

    // Make API call to get image src from Genius
    const image = await API.getImage(data);

    // Adding image src to the track details object
    data["image"] = image.data.song_art_image_thumbnail_url;

    // Since function is being used in a forEach loop,
    // update the songDetail state array with the existing values
    // along with the new data that was retrieved
    setSongDetail((oldSongDetail) => [...oldSongDetail, data]);

    // Make API call to find the track details in the db
    // by the song id
  }

  const renderRedirect = () => {
    if (state.currentSong && redirect) {
      return (
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
  return (
    <Container fluid>
      <Row>
        <Col>
          <h4 className="home--saved-title">
            {state.currentUser.username}'s Saved Songs
            <small>
              &nbsp;
              <Link push to="/saved">
                View All <i class="fas fa-angle-double-right"></i>
              </Link>
            </small>
          </h4>
        </Col>
      </Row>
      <Row>
        {songDetail.length ? (
          songDetail.map((song, index) => (
            <Col
              onClick={() => {
                selectSong(song);
              }}
              sm={6}
              md={3}
              key={song.id}
              className="my-3 px-4"
            >
              <div
                className="result-song--container px-3 py-3"
                style={{ backgroundImage: `url(${song.image})` }}
              >
                <div class="result-song--container__essentials text-center my-auto mx-auto h-100">
                  <p className="result-song--title mb-2">{song.title}</p>
                  <p className="result-song--artist">{song.artist}</p>
                  {/* <p className="result-song--genres">
                    {" "}
                    Genres: {song.styles.replace(/,/g, ", ")}
                  </p> */}

                  {song.duo === 0 ? (
                    ""
                  ) : (
                    <img
                      className="result-song--duet mr-2"
                      alt="Duet"
                      src={require("../img/duet-icon-white.png")}
                    />
                  )}
                </div>

                <div className="result-song--container__background">&nbsp;</div>
              </div>
            </Col>
          ))
        ) : (
          <p className={state.loading ? "d-none" : ""}>No results</p>
        )}
        {renderRedirect()}
      </Row>
    </Container>
  );
}
