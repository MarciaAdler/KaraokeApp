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
    getSongs(state.saved);
  }, []);
  async function getSongs(saved) {
    const songs = await saved.map((song) => {
      API.findSaved(song.songId).then((res) => {
        console.log(res.data);
        return res.data;
      });
    });
    // saved.forEach((song) => {
    //   API.findSaved(song.songId).then((res) => {
    //     console.log(res.data);
    //     songs.push(res.data);
    //   });
    // });
    console.log(songs);
    setSongDetail(songs);
  }
  //   const renderSavedSongs = () => {
  //     if (songDetail.length > 0) {
  //       return (
  //         // <Redirect push to={`/song/${state.currentSong.title}-${state.currentSong.artist}`}
  //         // />
  //         <SavedSong songDetail={songDetail} />
  //       );
  //     }
  //   };
  return (
    <div>
      <SavedSong songDetail={songDetail} />
    </div>
  );
}
