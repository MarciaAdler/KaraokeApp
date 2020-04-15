import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_SONG, SET_SAVED_SONGS } from "../utils/actions";
import { Redirect } from "react-router-dom";
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
    <div>
      {songDetail.length
        ? songDetail.map((song) => (
            <div key={song.id}>
              <img src={song.image} alt={song.title} />
              Title: {song.title}
              <br />
              Artist: {song.artist}
              <br />
              Year: {song.year}
              <br />
              Explicit: {song.explicit === 0 ? "false" : "true"}
              <br />
              Duo: {song.duo === 0 ? "false" : "true"}
              <br />
              Styles: {song.styles}
              <br />
              <button
                onClick={() => {
                  selectSong(song);
                }}
              >
                Select
              </button>
              <button
                onClick={() => {
                  deleteSong(song);
                }}
              >
                Delete
              </button>
            </div>
          ))
        : "no songs"}
      {renderRedirect()}
    </div>
  );
}
