import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
import SavedSong from "../components/SavedSong";
import { SET_CURRENT_USER, SET_SAVED_SONGS } from "../utils/actions";
import API from "../utils/API";
export default function Saved(props) {
  const [state, dispatch] = useStoreContext();
  const [songDetail, setSongDetail] = useState([]);

  useEffect(() => {
    // If the user refreshes the page, grab the saved song id's and currentUser id
    // from Local Storage to populate the saved page
    if (state.currentUser.id === 0 && localStorage.getItem("savedSongs")) {
      const savedSongsLs = JSON.parse(localStorage.getItem("savedSongs"));

      // Loop through the saved song ids from the local storage
      // to retrieve the track details
      savedSongsLs.forEach((song) => {
        getSongs(song);
      });
    } else {
      // When the page loads, go through each of the saved song ids
      // in the global state
      state.saved.forEach((song) => {
        getSongs(song);
      });
    }
  }, []);

  async function getSongs(saved) {
    // Make API call to find the track details in the db
    // by the song id
    const { data } = await API.findSaved(saved.songId);

    // Make API call to get image src from Genius
    const image = await API.getImage(data);

    // Adding image src to the track details object
    data["image"] = image.data.song_art_image_thumbnail_url;

    // Since function is being used in a forEach loop,
    // update the songDetail state array with the existing values
    // along with the new data that was retrieved
    setSongDetail((oldSongDetail) => [...oldSongDetail, data]);
  }
  function updateSaved(userId) {
    console.log(userId);
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
        response.data.forEach((song) => {
          getSongs(song);
        });
      })
      .catch((err) => console.log(err));
  }
  function deleteSong(song) {
    console.log(song);
    API.deleteSavedSong(song.id).then(() => {
      setSongDetail([]);
      updateSaved(state.currentUser.id);
    });
  }
  return (
    <div>
      <SavedSong songDetail={songDetail} deleteSong={deleteSong} />
    </div>
  );
}
