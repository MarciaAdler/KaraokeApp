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
    // getSongs(state.saved);
    state.saved.forEach(song => {
      getSongs(song);
    });

  }, []);

  async function getSongs(saved) {

    const { data } = await API.findSaved(saved.songId);

    console.log(data);
    setSongDetail(oldSongDetail => [...oldSongDetail, data]);
  }

  return (
    <div>
      <SavedSong songDetail={songDetail} />
    </div>
  );
}
