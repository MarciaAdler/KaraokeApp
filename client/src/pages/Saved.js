import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { LOADING, CLEAR_RESULTS, SET_CURRENT_SONG } from "../utils/actions";
import ResultSong from "../components/ResultSong";
import { Redirect } from "react-router-dom";
import SavedSong from "../components/SavedSong";
import API from "../utils/API";
export default function Saved(props) {
  const [state, dispatch] = useStoreContext();
  const [songDetail, setSongDetail] = useState([]);

  useEffect(() => {
    // When the page loads, go through each of the saved song ids
    // in the global state
    state.saved.forEach(song => {
      getSongs(song);
    });

  }, []);

  async function getSongs(saved) {

    // Make API call to find the track details in the db 
    // by the song id
    const { data } = await API.findSaved(saved.songId);

    const image = await API.getImage(data);

    data["image"] = image.data;

    console.log(data);
    // Since function is being used in a forEach loop,
    // update the array with the existing values 
    // along with the new data that was retrieved 
    setSongDetail(oldSongDetail => [...oldSongDetail, data]);
  }

  return (
    <div>
      <SavedSong songDetail={songDetail} />
    </div>
  );
}
