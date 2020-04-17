import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG, SET_SAVED_SONGS } from "../utils/actions";
import { Redirect } from "react-router-dom";
import { Row, Col, Media } from "react-bootstrap";
import API from "../utils/API";

export default function SavedSong({ songDetail, deleteSong }) {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [reset, setReset] = useState(false);

  function selectSong(song) {
    const savedSong = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      year: song.year,
      duo: song.duo,
      explicit: song.explicit,
      styles: song.styles,
    };

    dispatch({
      type: SET_CURRENT_SONG,
      currentSong: savedSong,
    });
    setRedirect(true);

    console.log(savedSong);
  }

  const renderRedirect = () => {
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/song",
            search: `?title=${state.currentSong.title}&&artist=${state.currentSong.artist}`,
          }}
        />
      );
    } else if (reset) {
      return <Redirect to="/saved"></Redirect>;
    }
  };

  return (
    <Row>
      {songDetail.length
        ? songDetail.map((song) => (
            <Col className="my-3" md={6} lg={4} key={song.id}>
              <Media onClick={() => {
              selectSong(song);
            }}  className="saved-song--container px-3 py-3 h-100">
                <img className="saved-song--artwork mr-4" src={song.image} alt={song.title} />
               
                <Media.Body>
                <h4 className="border-bottom pb-2">{song.title}</h4>
   
                <h5>{song.artist}</h5>
                <span className="d-block mb-2">Released: {song.year}</span>
                <span className="d-block">Genres: {song.styles.replace(/,/g, ", ")}</span>

                <div>
                  <Row className="mt-4">
                    
                    {song.explicit === 0 ? "" : <Col className="col-auto"><img className="saved-song--explicit mr-2" alt="Explicit" src={require('../img/explicit.png')} /></Col>}
                    
                    {song.duo === 0 ? "" : <Col className="col-auto"><img className="saved-song--duet mr-2" alt="Duet" src={require('../img/duet-icon.png')} /></Col>}
                    
                    
                    
                    
                  </Row>
                </div>
                

                
                
                
                
                
                
                </Media.Body>
              </Media> 
              <button className="saved-song--delete-btn rounded-circle px-2"
                  onClick={() => {
                    deleteSong(song);
                  }}
                >
                  X
                </button>
            </Col>
          ))
        : "no songs"}
      {renderRedirect()}
    </Row>
  );
}
