import React, { useState, useEffect } from "react";
import { Col, Row, Media } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG, SET_SONG_RESULTS, LOADING } from "../utils/actions";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

export default function ResultSong(props) {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  console.log("results state in ResultSong.js", state.results);

  useEffect(() => {
    getResultStateFromUrl(window.location.search);
  }, []);

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
  // capturing selected song title and artist in url
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

  // Reset results global state on page refresh.
  // takes search query from url and checks to see if there is a value to reset state for.  if there is
  // search database and return results and set results global state.

  async function getResultStateFromUrl(url) {
    // dispatch({ type: LOADING });
    // if the there is a state.results & window.location.search is true
    // if (state.results.length && window.location.search) {
    const { data } = await API.getSongs(url.replace("?q=", ""));
    // go through each song in the array returned from getSongs
    for (let i = 0; i < data.length; i++) {
      // for each index(song), get the image for that song
      if (i <= data.length) {
        const result = data[i];

        const image = await API.getImage(result);
        // add the image url to the song object
        result["image"] = image.data.song_art_image_thumbnail_url;
      }
    }
    // set the global state with the new array of song objects (including image)
    dispatch({
      type: SET_SONG_RESULTS,
      results: data,
    });
  }
  return (
    <Row>
      {state.loading ? <p>LOADING</p> : ""}
      {state.results.length ? (
        state.results.map((result, index) => (

          <Col onClick={() => {
            selectSong(result);
          }} sm={6} md={4} lg={3} key={result.id} className="my-3 px-4">
            <div className="result-song--container px-3 py-3" style={{backgroundImage: `url(${result.image})`}}>


                <div class="result-song--container__essentials text-center my-auto mx-auto h-100">
                  <p className="result-song--title mb-2">{result.title}</p>
                  <p className="result-song--artist">{result.artist}</p>
                  <p className="result-song--genres"> Genres: {result.styles.replace(/,/g, ", ")}</p>

                  {result.duo === 0 ? "" : <img className="result-song--duet mr-2" alt="Duet" src={require('../img/duet-icon-white.png')} />}
                </div>

              <div className="result-song--container__background">
                &nbsp;
              </div>
            {/* <Media className="saved-song--container px-3 py-3 h-100">
              <img style={{width: "75px", height: "auto"}}
                src={
                  result.image ? result.image : "https://via.placeholder.com/150"
                }
                alt={result.title}
              ></img>
              <Media.Body>
                 
                  <p className="">{result.title}</p>
                
                 <p>{result.artist}</p>
                 
                  Year: {result.year}
                  <br />
                  Explicit: {result.explicit === 0 ? "false" : "true"}
                  <br />
                  Duo: {result.duo === 0 ? "false" : "true"}
                  <br />
                  Styles: {result.styles}
                  <br />
                  <button
                    onClick={() => {
                      selectSong(result);
                    }}
                  >
                    Select
                  </button>
                </Media.Body>
              </Media> */}
              </div>
          </Col>
        ))
      ) : (
        <p className={state.loading ? "d-none" : ""}>No results</p>
      )}
      {renderRedirect()}
    </Row>
  );
}
