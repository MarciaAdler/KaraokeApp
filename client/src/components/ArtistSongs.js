import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function ArtistSongs() {
    const [state, dispatch] = useStoreContext();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        getArtistSongs(state.currentSong.artist);
    }, []);

    function getArtistSongs(artist) {
       API.getSongsByArtist(artist)
       .then(res => {
           let response = res.data;
           let titleArray = response.map(song => {
               return song.title;
           })
           setSongs(titleArray);
       })
       .catch(err => console.log(err));
    }
    
  return (
    <div>
        { songs.length !== 1 ? <h6 className="mt-4">Other songs by {state.currentSong.artist}:</h6> : ""}

      { songs.length !== 1 ? 
        
        songs.map(song => {
            return <a href={`/song?title=${song}&&artist=${state.currentSong.artist}`} className="d-inline-block mr-5 mb-1">{song}</a>;
        })
        : ""
        }
    </div>
  );
}